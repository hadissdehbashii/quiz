
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/axios';
import type { answerType } from '../types/Question';

interface UpdateQuestionPayload {
    id: number;
    question: string;
    answers: answerType[];
    originalAnswers: answerType[];
}

export function useUpdateQuestion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, question, answers, originalAnswers }: UpdateQuestionPayload) => {
            // Update question text
            await API.patch(`/questions/${id}`, { question });

            // Only send valid answers
            const validAnswers = answers.filter(a => a.answerText && a.answerText.trim() !== "");
            const originalIds = originalAnswers.map(a => a.id);
            const currentIds = validAnswers.map(a => a.id).filter(Boolean);

            // Update existing answers (PATCH only answerText, isCorrect)
            const updatePromises = validAnswers
                .filter(a => a.id && originalIds.includes(a.id))
                .map(a => API.patch(`/answers/${a.id}`, {
                    answerText: a.answerText,
                    isCorrect: a.isCorrect,
                }));

            // Add new answers (POST with questionId)
            const addPromises = validAnswers
                .filter(a => !a.id)
                .map(a => API.post('/answers', {
                    questionId: id,
                    answerText: a.answerText,
                    isCorrect: a.isCorrect,
                }));

            // Delete removed answers
            const deletePromises = originalAnswers
                .filter(a => !currentIds.includes(a.id))
                .map(a => API.delete(`/answers/${a.id}`));

            await Promise.all([...updatePromises, ...addPromises, ...deletePromises]);
            return { id, question, answers: validAnswers };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
    });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/axios';
import type {  answerType } from '../types/Question';

interface CreateQuestionPayload {
    question: string;
    correctAnswers: string[];
    incorrectAnswers: string[];
}

export function useCreateQuestion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ question, correctAnswers, incorrectAnswers }: CreateQuestionPayload) => {
            const { data: questionData } = await API.post('/questions', { question });
            const quizId = questionData.id;
            await Promise.all([
                ...correctAnswers.map((ans) => {
                    const answerPayload: Partial<answerType> = {
                        answerText: ans,
                        quizId,
                        isCorrect: true,
                    };
                    return API.post('/answers', answerPayload);
                }),
                ...incorrectAnswers.map((ans) => {
                    const answerPayload: Partial<answerType> = {
                        answerText: ans,
                        quizId,
                        isCorrect: false,
                    };
                    return API.post('/answers', answerPayload);
                }),
            ]);
            return { ...questionData, correctAnswers, incorrectAnswers };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
    });
}

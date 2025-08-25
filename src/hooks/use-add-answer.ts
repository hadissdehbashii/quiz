import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/axios';
import type { answerType } from '../types/Question';

interface AddAnswerPayload {
    questionId: number;
    answerText: string;
    isCorrect: boolean;
}

export function useAddAnswer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ questionId, answerText, isCorrect }: AddAnswerPayload) => {
            const { data } = await API.post('/answers', {
                questionId,
                answerText,
                isCorrect,
            });
            return data as answerType;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
    });
}

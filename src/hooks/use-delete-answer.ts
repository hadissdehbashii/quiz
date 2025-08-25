import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../utils/axios';

interface DeleteAnswerPayload {
    answerId: number;
}

export function useDeleteAnswer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ answerId }: DeleteAnswerPayload) => {
            await API.delete(`/answers/${answerId}`);
            return answerId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
    });
}

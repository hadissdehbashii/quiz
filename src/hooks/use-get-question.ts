import { useQuery } from '@tanstack/react-query';
import API from '../utils/axios';
import type { questionType } from '../types/Question';

export function useGetQuestion(id: string | number) {
    return useQuery({
        queryKey: ['question', id],
        queryFn: async () => {
            const { data } = await API.get(`/questions/${id}`);
            return data as questionType;
        },
        enabled: !!id,
    });
}

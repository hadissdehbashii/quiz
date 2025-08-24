import { useQuery } from "@tanstack/react-query"
import instance from "../utils/axios"
import type { questionType } from "../types/Question"

const useGetQuestions = () => {
    return useQuery({
        queryKey: ["questions"],
        queryFn: () => instance.get<questionType[]>('/questions').then((res) => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: true
    })
};

export default useGetQuestions;
import { useMutation, useQueryClient } from "@tanstack/react-query"
import instance from "../utils/axios";
import toast from "react-hot-toast";

const useDeleteQuestion = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(questionId:number)=>instance.delete(`/questions/${questionId}`),
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey:['questions']});
            toast.success('Question successfully deleted!');
        },
        onError:()=>{
            toast.error("Error deleting question!!")
        }
    })
};

export default useDeleteQuestion
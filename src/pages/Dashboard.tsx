import { useEffect, useState } from "react";
import { type questionType } from "../types/Question";
import instance from "../utils/axios";
import Card from "../components/Card";

const Dashboard = () => {
    const [questions,setQuestions] = useState<questionType[]>([])
    useEffect(()=>{
        instance.get('/questions').then(res=>{
            setQuestions(res.data)
        },)
    },[])
  return (
    <div className="p-5 grid grid-cols-1">
        {questions?.map((q)=>(
            <Card key={q.id} question={q}/>
        ))}
    </div>
  )
}

export default Dashboard
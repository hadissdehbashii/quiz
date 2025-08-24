<<<<<<< HEAD
import { useEffect } from "react";
import instance from "../utils/axios";
import Card from "../components/Card";
import { useQuizContext } from "../stores/QuizContext";

const Dashboard = () => {
    const { questions, setQuestions } = useQuizContext();
    useEffect(() => {
        instance.get('/questions').then(res => {
            setQuestions(res.data);
        });
    }, [setQuestions]);
    return (
        <div className="p-5 grid grid-cols-1">
            {questions?.map((q) => (
                <Card key={q.id} question={q} />
            ))}
        </div>
    );
=======

import Card from "../components/Card";
import {CircleFadingPlus} from "lucide-react";
import { useNavigate } from "react-router";
import useGetQuestions from "../hooks/use-get-questions";

 


const Dashboard = () => {
    const {data:questions=[]} = useGetQuestions()
    const navigate = useNavigate()
   
  return (
    <div>
        <div className="flex p-5 justify-between md:mx-10 ">
            <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
            <button onClick={()=>navigate("/quiz/new")} className="btn btn-primary hidden md:flex items-center gap-2 ">
                <CircleFadingPlus/>
                New Quiz</button>
        </div>


        <div className="p-5 grid grid-cols-1">
            
            {questions.length>0?(questions?.map((q)=>(
                <Card key={q.id} question={q} />
            ))):(
                <div className="text-center font-bold text-gray-400">
                    <p>No questions available...</p>
                </div>
            )
}
        </div>
    </div>
  )
>>>>>>> b635ca3505db820bde8898ceb2e7c89af4b64e16
}

export default Dashboard;
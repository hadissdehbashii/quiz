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
}

export default Dashboard;
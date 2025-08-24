import { createContext, useContext, useState } from "react";
import type { questionType } from "../types/Question";

interface QuizContextType {
    questions: questionType[];
    setQuestions: (questions: questionType[]) => void;
    addQuestion: (question: questionType) => void;
    removeQuestion: (id: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function useQuizContext() {
    const ctx = useContext(QuizContext);
    if (!ctx) throw new Error("QuizContext not found");
    return ctx;
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [questions, setQuestions] = useState<questionType[]>([]);
    const addQuestion = (question: questionType) => setQuestions((prev) => [question, ...prev]);
    const removeQuestion = (id: number) => setQuestions((prev) => prev.filter((q) => q.id !== id));

    return (
        <QuizContext.Provider value={{ questions, setQuestions, addQuestion, removeQuestion }}>
            {children}
        </QuizContext.Provider>
    );
}

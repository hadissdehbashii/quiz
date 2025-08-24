import { create } from "zustand";
import type { questionType } from "../types/Question";

interface QuizStore {
    questions: questionType[];
    setQuestions: (questions: questionType[]) => void;
    addQuestion: (question: questionType) => void;
    removeQuestion: (id: number) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
    questions: [],
    setQuestions: (questions) => set({ questions }),
    addQuestion: (question) => set((state) => ({ questions: [question, ...state.questions] })),
    removeQuestion: (id) => set((state) => ({ questions: state.questions.filter((q) => q.id !== id) })),
}));

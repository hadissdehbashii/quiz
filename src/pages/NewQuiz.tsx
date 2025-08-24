import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuizContext } from "../stores/QuizContext";
import API from "../utils/axios";
import type { questionType, answerType } from "../types/Question";

export default function NewQuiz() {
  const navigate = useNavigate();
  const { addQuestion, removeQuestion } = useQuizContext();
  const [question, setQuestion] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState<string>("");

  const addCorrectAnswer = () => setCorrectAnswers([...correctAnswers, ""]);
  const addIncorrectAnswer = () => setIncorrectAnswers([...incorrectAnswers, ""]);

  const handleCorrectChange = (i: number, value: string) => {
    const updated = [...correctAnswers];
    updated[i] = value;
    setCorrectAnswers(updated);
  };

  const handleIncorrectChange = (i: number, value: string) => {
    const updated = [...incorrectAnswers];
    updated[i] = value;
    setIncorrectAnswers(updated);
  };

  const handleSubmit = async () => {
    setError("");
    if (!question.trim()) {
      setError("Question is required!");
      return;
    }

    const validCorrect = correctAnswers.filter((a) => a.trim() !== "");
    const validIncorrect = incorrectAnswers.filter((a) => a.trim() !== "");
    const totalAnswers = validCorrect.length + validIncorrect.length;

    if (totalAnswers < 4) {
      setError("You must enter at least 4 answers (correct and incorrect)");
      return;
    }
    if (validCorrect.length < 1) {
      setError("At least one correct answer is required");
      return;
    }
    if (validIncorrect.length < 1) {
      setError("At least one incorrect answer is required");
      return;
    }

    // Optimistic UI
    const tempId = Date.now();
    const optimisticQuiz: questionType = {
      id: tempId,
      question,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      answers: [
        ...validCorrect.map((a) => ({
          id: Date.now() + Math.random(),
          answerText: a,
          isCorrect: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          quizId: tempId,
        })),
        ...validIncorrect.map((a) => ({
          id: Date.now() + Math.random(),
          answerText: a,
          isCorrect: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          quizId: tempId,
        })),
      ],
    };

    addQuestion(optimisticQuiz);
    setQuestion("");
    setCorrectAnswers([""]);
    setIncorrectAnswers(["", "", ""]);

    try {
      const { data: questionData } = await API.post("/questions", { question });
      const quizId = questionData.id;

      await Promise.all([
        ...validCorrect.map((ans) => {
          const answerPayload: Partial<answerType> = {
            answerText: ans,
            quizId,
            isCorrect: true,
          };
          return API.post("/answers", answerPayload);
        }),
        ...validIncorrect.map((ans) => {
          const answerPayload: Partial<answerType> = {
            answerText: ans,
            quizId,
            isCorrect: false,
          };
          return API.post("/answers", answerPayload);
        }),
      ]);

      removeQuestion(tempId);
      addQuestion({ ...optimisticQuiz, id: quizId });
      alert("Quiz created successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error creating quiz ❌");
      removeQuestion(tempId);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="w-full size-auto shadow-xl p-4 sm:p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">Create New QUIZ</h2>
        <p className="text-sm text-gray-400 mb-6">
          Fill in the details to create a new question with at least 4 answers.
        </p>

        {error && <div className="alert alert-error mb-4 text-right">{error}</div>}

        {/* Question Input */}
        <div className="form-control mb-6 w-full">
          <label className="label my-2.5">
            <span className="label-text text-lg font-semibold">Question</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Question Here ....."
            className="input input-bordered w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Correct Answers */}
        <div className="border-l-4 border-green-500 p-4 mb-6 bg-base-200 rounded w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="label-text font-bold text-green-400">Correct Answer</span>
            <button className="btn btn-dash btn-xs" onClick={addCorrectAnswer}>
              + Add
            </button>
          </div>
          {correctAnswers.map((ans, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Enter Correct Answer"
                className="input input-bordered w-full"
                value={ans}
                onChange={(e) => handleCorrectChange(i, e.target.value)}
              />
              <button
                className="btn btn-error btn-sm"
                onClick={() =>
                  setCorrectAnswers(correctAnswers.filter((_, idx) => idx !== i))
                }
                disabled={correctAnswers.length === 1}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Incorrect Answers */}
        <div className="border-l-4 border-red-500 p-4 mb-6 bg-base-200 rounded w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="label-text font-bold text-red-400">Incorrect Answer</span>
            <button className="btn btn-dash btn-xs" onClick={addIncorrectAnswer}>
              + Add
            </button>
          </div>
          {incorrectAnswers.map((ans, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Enter Incorrect Answer"
                className="input input-bordered w-full"
                value={ans}
                onChange={(e) => handleIncorrectChange(i, e.target.value)}
              />
              <button
                className="btn btn-error btn-sm"
                onClick={() =>
                  setIncorrectAnswers(incorrectAnswers.filter((_, idx) => idx !== i))
                }
                disabled={incorrectAnswers.length === 1}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 w-full mt-4">
          <button
            className="btn"
            onClick={() => {
              setQuestion("");
              setCorrectAnswers([""]);
              setIncorrectAnswers(["", "", ""]);
              setError("");
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

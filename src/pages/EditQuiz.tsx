import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../utils/axios";
import type { answerType } from "../types/Question";

export default function EditQuiz() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [question, setQuestion] = useState<string>("");
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchQuiz() {
            setLoading(true);
            try {
                const { data } = await API.get(`/questions/${id}`);
                setQuestion(data.question);
                setCorrectAnswers(
                    data.answers.filter((a: answerType) => a.isCorrect).map((a: answerType) => a.answerText)
                );
                setIncorrectAnswers(
                    data.answers.filter((a: answerType) => !a.isCorrect).map((a: answerType) => a.answerText)
                );
            } catch (err) {
                setError("Error loading quiz data");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchQuiz();
    }, [id]);

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

        try {
            await API.put(`/questions/${id}`, { question });
            await API.delete(`/questions/${id}/answers`);

            await Promise.all([
                ...validCorrect.map((ans) => {
                    const answerPayload: Partial<answerType> = {
                        answerText: ans,
                        quizId: Number(id),
                        isCorrect: true,
                    };
                    return API.post("/answers", answerPayload);
                }),
                ...validIncorrect.map((ans) => {
                    const answerPayload: Partial<answerType> = {
                        answerText: ans,
                        quizId: Number(id),
                        isCorrect: false,
                    };
                    return API.post("/answers", answerPayload);
                }),
            ]);

            alert("Quiz updated successfully ✅");
            navigate("/dashboard");
        } catch (err) {
            setError("Error updating quiz ❌");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center py-8 px-2 sm:px-6 md:px-12 lg:px-32">
            <div className="w-full max-w-7xl bg-base-100 shadow-2xl rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-primary mb-2">Edit QUIZ</h2>
                <p className="text-base text-base-content mb-6">Edit your question and answers below.</p>

                {error && <div className="alert alert-error mb-4 text-right">{error}</div>}

                {/* Question */}
                <div className="form-control w-full">
                    <label className="label mb-2">
                        <span className="label-text text-lg font-semibold">Question</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Edit your Question Here ....."
                        className="input input-bordered w-full text-lg px-6 py-4 rounded-xl shadow-sm"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                {/* Correct Answers */}
                <div
                    className="border-l-4 p-6 mb-6 bg-base-200 rounded-xl w-full"
                    style={{ borderColor: "var(--color-success)" }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-success text-lg">Correct Answer</span>
                        <button
                            className="btn btn-xs bg-base-100 text-success border border-success rounded-md"
                            onClick={addCorrectAnswer}
                        >
                            + Add
                        </button>
                    </div>
                    {correctAnswers.map((ans, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
                            <input
                                type="text"
                                placeholder="Edit Correct Answer"
                                className="input input-bordered w-full text-base px-5 py-3 rounded-lg shadow-sm border border-success"
                                style={{ color: "var(--color-success)" }}
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
                <div
                    className="border-l-4 p-6 mb-6 bg-base-200 rounded-xl w-full"
                    style={{ borderColor: "var(--color-error)" }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-error text-lg">Incorrect Answer</span>
                        <button
                            className="btn btn-xs bg-base-100 text-error border border-error rounded-md"
                            onClick={addIncorrectAnswer}
                        >
                            + Add
                        </button>
                    </div>
                    {incorrectAnswers.map((ans, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
                            <input
                                type="text"
                                placeholder="Edit Incorrect Answer"
                                className="input input-bordered w-full text-base px-5 py-3 rounded-lg shadow-sm border border-error"
                                style={{ color: "var(--color-error)" }}
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 w-full mt-6">
                    <button
                        className="btn bg-base-100 text-base-content border border-base-300 rounded-lg px-6 py-3 text-lg"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary rounded-lg px-6 py-3 text-lg font-bold"
                        onClick={handleSubmit}
                    >
                        Update Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

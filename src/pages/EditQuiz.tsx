import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useUpdateQuestion } from "../hooks/use-update-question";
import { useGetQuestion } from "../hooks/use-get-question";
import type { answerType } from "../types/Question";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function EditQuiz() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isLoading, error: fetchError } = useGetQuestion(id!);
    const [question, setQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<answerType[]>([]);
    const [originalAnswers, setOriginalAnswers] = useState<answerType[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { mutateAsync } = useUpdateQuestion();

    useEffect(() => {
        if (data) {
            setQuestion(data.question);
            setAnswers(data.answers);
            setOriginalAnswers(data.answers);
        }
    }, [data]);

    // Add new correct/incorrect answer
    const addAnswer = (isCorrect: boolean) => {
        if (answers.length >= 4) return;
        setAnswers([
            ...answers,
            {
                id: 0, // 0 means new answer
                answerText: "",
                isCorrect,
                createdAt: "",
                updatedAt: "",
                quizId: Number(id),
            },
        ]);
    };

    // Change answer text
    const handleAnswerChange = (index: number, value: string) => {
        const updated = [...answers];
        updated[index].answerText = value;
        setAnswers(updated);
    };

    // Toggle correct/incorrect
    const toggleCorrect = (index: number) => {
        const updated = answers.map((a, idx) =>
            idx === index ? { ...a, isCorrect: !a.isCorrect } : a
        );
        setAnswers(updated);
    };

    // Remove answer
    const removeAnswer = (index: number) => {
        if (answers.length <= 2) return;
        setAnswers(answers.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async () => {
        setError("");
        if (!question.trim()) {
            setError("Question is required!");
            return;
        }

        const validAnswers = answers.filter((a) => a.answerText.trim() !== "");
        if (validAnswers.length < 2) {
            setError("At least 2 answers are required");
            return;
        }
        if (validAnswers.length > 4) {
            setError("Maximum 4 answers allowed");
            return;
        }
        if (!validAnswers.some((a) => a.isCorrect)) {
            setError("At least one correct answer is required");
            return;
        }

        setLoading(true);
        try {
            await mutateAsync({
                id: Number(id),
                question,
                answers: validAnswers,
                originalAnswers,
            });
            toast.success("Quiz updated successfully ✅");
            navigate("/dashboard");
        } catch {
            toast.error("Error updating quiz ❌");
            setError("Error updating quiz ❌");
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (fetchError) {
        return <div className="text-center text-error">Error loading quiz data</div>;
    }

    return (
        <div className="min-h-screen  flex justify-center py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
            <div className="w-full size-auto shadow-xl p-4 sm:p-8 rounded-lg">
                <h2 className="text-2xl font-bold" style={{ color: '#6F42C1' }}>Edit QUIZ</h2>
                <p className="text-sm text-gray-400 mb-6">
                    Fill in the details to update your question and answers.
                </p>

                {error && <div className="alert alert-error mb-4 text-right">{error}</div>}

                {/* Question Input */}
                <div className="form-control mb-6 w-full">
                    <label className="label my-2.5">
                        <span className="label-text text-lg font-semibold">Question</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Edit your Question Here ....."
                        className="input input-bordered w-full"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                {/* Correct Answers */}
                <div className="border-l-4 border-green-500 p-4 mb-6 bg-base-200 rounded w-full">
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-green-400">Correct Answer</span>
                        <button
                            className="btn btn-dash btn-xs"
                            onClick={() => addAnswer(true)}
                            disabled={answers.length >= 4 || loading || isLoading}
                        >
                            + Add
                        </button>
                    </div>
                    {answers
                        .map((ans, index) => ({ ans, index }))
                        .filter(({ ans }) => ans.isCorrect)
                        .map(({ ans, index }) => (
                            <div key={index} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Edit Correct Answer"
                                    className="input input-bordered w-full"
                                    value={ans.answerText}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                />
                                <button
                                    className="btn btn-sm flex items-center justify-center shadow-none bg-transparent border-none hover:bg-transparent"
                                    onClick={() => removeAnswer(index)}
                                    disabled={answers.filter((a) => a.isCorrect).length === 1 || loading || isLoading}
                                >
                                    <Trash2 size={18} color="#ef4444" />
                                </button>
                            </div>
                        ))}
                </div>

                {/* Incorrect Answers */}
                <div className="border-l-4 border-red-500 p-4 mb-6 bg-base-200 rounded w-full">
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-red-400">Incorrect Answer</span>
                        <button
                            className="btn btn-dash btn-xs"
                            onClick={() => addAnswer(false)}
                            disabled={answers.length >= 4 || loading || isLoading}
                        >
                            + Add
                        </button>
                    </div>
                    {answers
                        .map((ans, index) => ({ ans, index }))
                        .filter(({ ans }) => !ans.isCorrect)
                        .map(({ ans, index }) => (
                            <div key={index} className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Edit Incorrect Answer"
                                    className="input input-bordered w-full"
                                    value={ans.answerText}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                />
                                <button
                                    className="btn btn-sm flex items-center justify-center shadow-none bg-transparent border-none hover:bg-transparent"
                                    onClick={() => removeAnswer(index)}
                                    disabled={answers.filter((a) => !a.isCorrect).length === 1 || loading || isLoading}
                                >
                                    <Trash2 size={18} color="#ef4444" />
                                </button>
                            </div>
                        ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 w-full mt-4">
                    <button
                        className="btn"
                        onClick={() => navigate("/dashboard")}
                        disabled={loading || isLoading}
                    >
                        Cancel
                    </button>
                    <button className="btn" style={{ backgroundColor: '#6F42C1', color: '#fff' }} onClick={handleSubmit} disabled={loading || isLoading}>
                        {loading ? "Saving..." : "Update Quiz"}
                    </button>
                </div>
            </div>
        </div>
    );
}



import { useState } from "react";
import API from "../utils/axios"; 

export default function NewQuiz() {
    const [question, setQuestion] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState([""]);
    const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);
    const [loading, setLoading] = useState(false);

    const addCorrectAnswer = () => setCorrectAnswers([...correctAnswers, ""]);
    const addIncorrectAnswer = () => setIncorrectAnswers([...incorrectAnswers, ""]);

    const handleCorrectChange = (i, value) => {
        const updated = [...correctAnswers];
        updated[i] = value;
        setCorrectAnswers(updated);
    };

    const handleIncorrectChange = (i, value) => {
        const updated = [...incorrectAnswers];
        updated[i] = value;
        setIncorrectAnswers(updated);
    };


    const handleSubmit = async () => {
        if (!question.trim()) {
            alert("Question is required!");
            return;
        }

        setLoading(true);
        try {

            const { data: questionData } = await API.post("/questions", {
                question,
            });

            const quizId = questionData.id;


            for (const ans of correctAnswers.filter((a) => a.trim() !== "")) {
                await API.post("/answers", {
                    answerText: ans,
                    quizId,
                    isCorrect: true,
                });
            }


            for (const ans of incorrectAnswers.filter((a) => a.trim() !== "")) {
                await API.post("/answers", {
                    answerText: ans,
                    quizId,
                    isCorrect: false,
                });
            }

            alert("Quiz created successfully ✅");


            setQuestion("");
            setCorrectAnswers([""]);
            setIncorrectAnswers(["", "", ""]);
        } catch (err) {
            console.error(err);
            alert("Error creating quiz ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center py-10">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                    Create New QUIZ
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                    Fill in the details to create a new question with at least 4 answers.
                </p>

                {/* Question Input */}
                <div className="form-control mb-6">
                    <label className="label">
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
                <div className="border-l-4 border-green-500 p-4 mb-6 bg-base-200 rounded">
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-green-400">
                            Correct Answer
                        </span>
                        <button className="btn btn-dash btn-xs" onClick={addCorrectAnswer}>
                            + Add
                        </button>
                    </div>
                    {correctAnswers.map((ans, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
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
                            >
                                🗑
                            </button>
                        </div>
                    ))}
                </div>

                {/* Incorrect Answers */}
                <div className="border-l-4 border-red-500 p-4 mb-6 bg-base-200 rounded">
                    <div className="flex justify-between items-center mb-2">
                        <span className="label-text font-bold text-red-400">
                            Incorrect Answer
                        </span>
                        <button
                            className="btn btn-dash btn-xs"
                            onClick={addIncorrectAnswer}
                        >
                            + Add
                        </button>
                    </div>
                    {incorrectAnswers.map((ans, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
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
                                    setIncorrectAnswers(
                                        incorrectAnswers.filter((_, idx) => idx !== i)
                                    )
                                }
                            >
                                🗑
                            </button>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button className="btn">Cancel</button>
                    <button
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Quiz"}
                    </button>
                </div>
            </div>
        </div>
    );
}

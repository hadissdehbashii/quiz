import { EllipsisVertical, Dot } from "lucide-react";
import { type questionType } from "../types/Question";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "../utils/axios";

const Card = ({ question }: { question: questionType }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const date = new Date(question.createdAt);
    const formattedDate = date.toLocaleDateString("en-us", {
        month: "short",
        year: "numeric",
        day: "numeric",
    });

    return (
        <div className="border-2 border-gray-200 dark:border-gray-700 mb-6 md:mx-10 p-5 rounded-2xl relative font-poppins">
            <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-700  pb-3">
                <div className="flex items-center justify-center text-gray-500">
                    <p>john doe</p>
                    <Dot className="size-8 mt-2 m" />
                    <p>{formattedDate}</p>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="bg-[#DAF1D0] dark:text-[#DAF1D0] dark:bg-[#417F25] text-[#417F25] px-3 py-1 rounded-2xl">Publish</h1>
                    <div className="relative">
                        <span
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="p-2 cursor-pointer hover:text-gray-500"
                        >
                            <EllipsisVertical className="size-5" />
                        </span>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-28 menu rounded-box bg-base-100 shadow-sm z-10 gap-1">
                                <li>
                                    <button
                                        className="btn mb-2"
                                        style={{ backgroundColor: '#6F42C1', color: '#fff' }}
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            navigate(`/quiz/edit/${question.id}`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="btn text-red-600 border border-red-600"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-3 border-b-2 border-gray-200 dark:border-gray-700 ">
                <h2 className="font-bold text-xl ">{question.question}</h2>
                {question?.answers.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 m-3">
                        <input
                            type="radio"
                            className="radio radio-xs radio-primary"
                            checked={selectedAnswerId === p.id}
                            onChange={() => setSelectedAnswerId(p.id)}
                        />
                        <p>{p.answerText}</p>
                    </div>
                ))}
            </div>
            <button
                className="btn mt-3"
                style={{ backgroundColor: '#6F42C1', color: '#fff' }}
                disabled={selectedAnswerId === null || loading}
                onClick={async () => {
                    if (selectedAnswerId === null) return;
                    setLoading(true);
                    try {
                        const res = await axios.get(`/answers/${selectedAnswerId}`);
                        if (res.data.isCorrect) {
                            toast.success("Correct answer!");
                        } else {
                            toast.error("Wrong answer!");
                        }
                    } catch {
                        toast.error("Error checking answer");
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                {loading ? "Checking..." : "Submit answer"}
            </button>
            {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    questionId={question.id}
                    questionText={question.question}
                />
            )}
        </div>
    );
};

export default Card;
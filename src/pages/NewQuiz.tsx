import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateQuestion } from "../hooks/use-create-question";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function NewQuiz() {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateQuestion();
  const [question, setQuestion] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

    setLoading(true);
    try {
      const result = await mutateAsync({
        question,
        correctAnswers: validCorrect,
        incorrectAnswers: validIncorrect,
      });
      if (result && result.id) {
        console.log("Created quiz id:", result.id);
      }
      setQuestion("");
      setCorrectAnswers([""]);
      setIncorrectAnswers(["", "", ""]);
      toast.success("Quiz created successfully ✅");
      navigate("/dashboard");
    } catch {
      toast.error("Error creating quiz ❌");
      setError("Error creating quiz ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex justify-center py-5 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 font-poppins">
      <div className="w-full size-auto shadow-xl p-4 sm:p-8 rounded-lg">
        <h2 className="text-2xl font-bold" style={{ color: '#6F42C1' }}>Create New QUIZ</h2>
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
            <button className="btn btn-dash btn-xs" onClick={addCorrectAnswer} disabled={loading}>
              + Add
            </button>
          </div>
          {correctAnswers.map((ans, i) => (
            <div key={i} className="flex items-center gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Enter Correct Answer"
                className="input input-bordered w-full"
                value={ans}
                onChange={(e) => handleCorrectChange(i, e.target.value)}
              />
              <button
                className="btn btn-sm flex items-center justify-center shadow-none bg-transparent border-none hover:bg-transparent"
                onClick={() =>
                  setCorrectAnswers(correctAnswers.filter((_, idx) => idx !== i))
                }
                disabled={correctAnswers.length === 1 || loading}
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
            <button className="btn btn-dash btn-xs" onClick={addIncorrectAnswer} disabled={loading}>
              + Add
            </button>
          </div>
          {incorrectAnswers.map((ans, i) => (
            <div key={i} className="flex items-center gap-2 mb-2 w-full">
              <input
                type="text"
                placeholder="Enter Incorrect Answer"
                className="input input-bordered w-full"
                value={ans}
                onChange={(e) => handleIncorrectChange(i, e.target.value)}
              />
              <button
                className="btn btn-sm flex items-center justify-center shadow-none bg-transparent border-none hover:bg-transparent"
                onClick={() =>
                  setIncorrectAnswers(incorrectAnswers.filter((_, idx) => idx !== i))
                }
                disabled={incorrectAnswers.length === 1 || loading}
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
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn" style={{ backgroundColor: '#6F42C1', color: '#fff' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}

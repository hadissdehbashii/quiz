import { Dot } from "lucide-react";
import { type questionType } from "../types/Question";

const HistoryCard = ({ question }: { question: questionType }) => {
  const date = new Date(question.createdAt);
  const formattedDate = date.toLocaleDateString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  return (
    <div className="border-2 border-gray-200 dark:border-gray-700 mb-6 md:mx-10 p-5 rounded-2xl relative font-poppins">
      
      <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-700 pb-3">
        <div className="flex items-center justify-center text-gray-500">
          <p>john doe</p>
          <Dot className="size-8 mt-2" />
          <p>{formattedDate}</p>
        </div>
        <h1 className="bg-[#DAF1D0] dark:text-[#DAF1D0] dark:bg-[#417F25] text-[#417F25] px-3 py-1 rounded-2xl">
          Published
        </h1>
      </div>

      
      <div className="mt-3">
        <h2 className="font-bold text-xl">{question.question}</h2>
        {question.answers.map((p) => (
          <div key={p.id} className="flex items-center gap-3 m-3">
            <input
              type="radio"
              className="radio radio-xs radio-primary"
              checked={p.isCorrect} 
              readOnly
            />
            <p>{p.answerText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;

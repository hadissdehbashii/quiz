import HistoryCard from "../components/HistoryCard";
import useGetQuestions from "../hooks/use-get-questions";

const History = () => {
  const { data: questions = [], isLoading } = useGetQuestions();

  return (
    <div>
      <div className="flex p-5 justify-between md:mx-10 font-poppins">
        <h1 className="text-2xl font-bold">Quiz History</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="p-5 grid grid-cols-1">
          {questions.length > 0 ? (
            questions.map((q) => <HistoryCard key={q.id} question={q} />)
          ) : (
            <div className="text-center font-bold text-gray-400">
              <p>No history available...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;

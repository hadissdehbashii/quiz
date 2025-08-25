import useDeleteQuestion from "../hooks/use-delete-question";

interface modalProp {
  onClose: () => void;
  questionId: number;
  questionText: string
}
const Modal = ({ onClose, questionId, questionText }: modalProp) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { mutate: deleteQuestion, isPending } = useDeleteQuestion();
  return (
    <>
      {/* Overlay with opacity only, no color for theme compatibility */}
      <div onClick={onClose} className="fixed inset-0 z-40" style={{ opacity: 0.5, background: 'rgba(0,0,0,0.5)' }}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div onClick={handleContentClick} className="border m-10 rounded-xl py-8 px-10 md:m-80 bg-base-100">
          <div className="flex flex-col ">
            <div className="flex gap-2 md:items-center md:justify-center ">
              <h1 className="font-bold text-red-700">Delete</h1>
              <span className="font-bold">: {questionText}</span>
            </div>
            <div className="mt-3 text-center ">
              <p>
                Are you sure you want to delete [
                <span className="text-red-600 font-medium">{questionText}</span>
                ] ?
              </p>
            </div>
          </div>
          <h2 className="font-semibold" >Reason</h2>
          <textarea className="w-full resize-none p-3 mt-3 focus:outline-0 border-2 rounded-lg  " placeholder="write a reason"></textarea>
          <div className="flex justify-end mt-4 gap-3">
            <button onClick={onClose} className="btn">Cancel</button>
            <button disabled={isPending} className="btn btn-outline btn-error"
              onClick={() => deleteQuestion(questionId, { onSuccess: onClose })}>{isPending ? "Deleting..." : "Submit"}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
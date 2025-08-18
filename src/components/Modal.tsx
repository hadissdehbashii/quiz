import { useState } from "react";

const Modal = () => {
    const [questions,setQuestions] = useState<string[]>([])

    const handleDelete = (id:number) =>{
        const allQuestions = [...questions];

    }
  
  return (
    <div className="border border-gray-200 bg-[#F3F3F3] m-10 rounded-xl py-8 px-10 md:m-80   ">
      <div className="flex flex-col ">
        <div className="flex gap-2 md:items-center md:justify-center ">
            <h1 className="font-bold text-red-700">Delete</h1>
            <span className="font-bold">: What does CSS Stand For?</span>
        </div>
        <div className="mt-3 text-center ">
            <p>
            Are you sure you want to delete [
            <span className="text-red-600 font-medium">What does CSS Stand For?</span>
            ] ?
            </p>
        </div>
      </div>
      <h2 className="font-semibold" >Reason</h2>
      <textarea className="w-full resize-none p-3 mt-3 focus:outline-0 border-2 rounded-lg border-gray-200 " placeholder="write a reason"></textarea>
      <div className="flex justify-end mt-4 gap-3">
        <button className="btn">Cancel</button>
        <button className="btn bg-[#D00000] text-gray-100">Submit</button>
      </div>
    </div>
  );
};

export default Modal;
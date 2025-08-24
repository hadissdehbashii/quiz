import {EllipsisVertical,Dot} from "lucide-react"
import {  type questionType } from "../types/Question";
import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";

const Card = ({question}:{question:questionType}) => {
    const [selectedAnswer,setSelectedAnswer]= useState<number|null>(null)
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    
    const date = new Date(question.createdAt);
    const  formattedDate =date.toLocaleDateString("en-us",{
        month : "short",
        year : "numeric",
        day : "numeric",

    })
    
    return (
        <div  className="border-2 border-gray-200 mb-6  md:mx-10  p-5 rounded-2xl relative" >
           <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
              <div className="flex items-center justify-center text-gray-500">
                <p >john doe</p>
                <Dot className="size-8 mt-2 m" />
                <p >{formattedDate}</p>
              </div>
            <div className="flex justify-center items-center ">
                <h1 className="bg-[#DAF1D0] text-[#417F25] px-3 py-1 rounded-2xl ">Publish</h1>
               
               
               <div className="relative">
                <div
                    className="p-2 cursor-pointer hover:text-gray-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <EllipsisVertical className="size-5" />
                </div>

                {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-28 menu rounded-box bg-base-100 shadow-sm z-10 gap-1">
                    <li>
                        <button
                        onClick={() => {
                            setIsDropdownOpen(false);
                            
                        }}
                        className="btn btn-primary mb-2"
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
           <div className=" mt-3 border-b-2 border-gray-200">
            <h2 className="font-bold text-xl text-[#1F1F1F]">{question.question}</h2>
            {question?.answers.map((p)=>(

                <div key={p.id} className="flex items-center gap-3 m-3">
                    <input type="radio" checked={selectedAnswer===p.id}
                     onChange={()=>setSelectedAnswer(p.id)}
                     className="radio radio-xs radio-primary " />
                    <p>{p.answerText}</p>
                </div>

            ))}
           
           </div>
           <button onClick={()=>toast.success("Option selected.")}  className="btn btn-primary mt-3">Submit answer
           
           </button>
           {isModalOpen && (
            
                <Modal onClose={()=>setIsModalOpen(false)} questionId={question.id} questionText={question.question} />
            
            )}

        </div>
  )
}

export default Card
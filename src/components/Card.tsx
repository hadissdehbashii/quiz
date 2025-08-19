import {EllipsisVertical,Dot} from "lucide-react"
import { type questionType } from "../types/Question";
const Card = ({question}:{question:questionType}) => {
    const date = new Date(question.createdAt);
    const  formattedDate =date.toLocaleDateString("en-us",{
        month : "short",
        year : "numeric",
        day : "numeric",

    })
    
    return (
        <div className="border-2 border-gray-200 m-10  p-5 rounded-2xl">
           <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
              <div className="flex items-center justify-center text-gray-500">
                <p >john doe</p>
                <Dot className="size-8 mt-2 m" />
                <p >{formattedDate}</p>
              </div>
            <div className="flex justify-center items-center ">
                <h1 className="bg-[#DAF1D0] text-[#417F25] px-3 py-1 rounded-2xl ">Publish</h1>
                <EllipsisVertical  className="size-5  "/>
            </div>
           </div>
           <div className=" mt-3 border-b-2 border-gray-200">
            <h2 className="font-bold text-xl text-[#1F1F1F]">{question.question}</h2>
            {question?.answers.map((p)=>(

                <div key={p.id} className="flex items-center gap-3 m-3">
                    <input type="checkbox"className="checkbox checkbox-xs checkbox-primary border-2" />
                    <p>{p.answerText}</p>
                </div>

            ))}
           
           </div>
           <button className="btn btn-primary mt-3">Submit answer</button>
            

        </div>
  )
}

export default Card
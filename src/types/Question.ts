export type questionType = {
    id : number;
    question : string;
    createdAt : string;
    updatedAt : string;
    answers : answerType[];
}

export type answerType = {
    id : number;
    answerText : string;
    isCorrect : boolean;
    createdAt : string;
    updatedAt : string ; 
    quizId : number
}
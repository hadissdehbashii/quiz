import axios from "../utils/axios";

export async function checkAnswerApi(questionId: number, answerId: number) {
    // Assuming endpoint: /:questionId/check-answer/:answerId
    const res = await axios.get(`/${questionId}/check-answer/${answerId}`);
    return res.data; // { correct: boolean }
}

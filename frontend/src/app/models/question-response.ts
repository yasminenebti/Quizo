import { QuizResponse } from "./quiz-response";

export interface QuestionResponse {
    id : Number , 
    content : String  , 
    options : Array<String>,
    answer : String , 
    quiz : QuizResponse


}

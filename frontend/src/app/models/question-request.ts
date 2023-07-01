export interface QuestionRequest {
    content: String,
    options: Array<String>,
    answer: any,
    quiz: {
        id : Number
    } 
}

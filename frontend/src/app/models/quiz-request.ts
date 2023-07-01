
export interface QuizRequest {
    name: String,
    marks: Number,
    nbQuestions: Number,
    image : File,
    active:boolean,
    topic: {
        id : Number
    } 
}

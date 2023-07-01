import { TopicModel } from "./topic-model";

export interface QuizResponse {
    id: Number,
    name: String,
    marks: Number,
    nbQuestions: Number,
    active: boolean,
    image : any,
    topic: TopicModel
}

import { QuestionResponse } from './../models/question-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { QuestionRequest } from '../models/question-request';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http : HttpClient
  ) { }

  getQuizQuestion(id : Number) : Observable<Array<QuestionResponse>> {
    return this.http.get<Array<QuestionResponse>>(`${baseUrl}/api/v1/question/quiz/${id}`)
  }

  addNewQuiz(question : QuestionRequest) : Observable<QuestionResponse>{
    return this.http.post<QuestionResponse>(`${baseUrl}/api/v1/question`,question)
  }
  deleteQuestion(id : Number) :Observable<any> {
    return this.http.delete(`${baseUrl}/api/v1/question/${id}`)
 }

}

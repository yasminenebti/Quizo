import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './helper';
import { QuizRequest } from '../models/quiz-request';
import { QuizResponse } from '../models/quiz-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizId: Number =0;

  constructor(
    private http : HttpClient
  ) { }

  getAllQuiz() : Observable<Array<QuizResponse>>{
    return this.http.get<Array<QuizResponse>>(`${baseUrl}/api/v1/quiz`)
  }

  addNewQuiz(quiz : any) : Observable<QuizRequest>{
    return this.http.post<QuizRequest>(`${baseUrl}/api/v1/quiz`,quiz)
  }

  deleteQuiz(id : Number) :Observable<any> {
     return this.http.delete(`${baseUrl}/api/v1/quiz/${id}`)
  }

  getQuizById(id : Number) :Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${baseUrl}/api/v1/quiz/${id}`)
 }
 getQuizByTopic(id : Number) :Observable<Array<QuizResponse>> {
  return this.http.get<Array<QuizResponse>>(`${baseUrl}/api/v1/quiz/topic/${id}`)
}

 updateQuiz(id : Number , quiz : QuizResponse) : Observable<QuizResponse> {
  return this.http.put<QuizResponse>(`${baseUrl}/api/v1/quiz/${id}` , quiz)
 }

 setQuizId(quizId: Number) {
  this.quizId = quizId;
}

getQuizId(): Number {
  return this.quizId;
}
attemptQuiz(quizId : Number) :Observable<any> {
  return this.http.get(`${baseUrl}/api/v1/quiz/attempted/${quizId}`)
}


updateQuizImage(file: File, quizId: Number): Observable<QuizResponse> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('quizId', quizId.toString());

  const httpOptions = {
    headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
  };

  return this.http.put<QuizResponse>(`${baseUrl}/api/v1/quiz/image`, formData, httpOptions);
}

}

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';
import { TopicModel } from '../models/topic-model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http :HttpClient
  ) { }

  getAllTopics() : Observable<Array<TopicModel>>{
    return this.http.get<Array<TopicModel>>(`${baseUrl}/api/v1/topic`)
  }

  getTopicById(id : Number) :Observable<TopicModel> {
    return this.http.get<TopicModel>(`${baseUrl}/api/v1/topic/${id}`)
 }

  

  addNewTopic(topic : any) : Observable<any>{
    return this.http.post(`${baseUrl}/api/v1/topic`,topic)
  }





}

import { Component } from '@angular/core';
import { TopicModel } from 'src/app/models/topic-model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.css']
})
export class ViewTopicsComponent {

  topics : Array<TopicModel> = [];

  constructor(
    private topicService : TopicService 
  ) {
    this.topicService.getAllTopics().subscribe(topic => {
      this.topics = topic
    })
  }

 

}

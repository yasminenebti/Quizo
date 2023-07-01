import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopicModel } from 'src/app/models/topic-model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  topics : Array<TopicModel> = [];
  constructor(
    private topicService : TopicService,
    private router : Router
  ) {
    this.topicService.getAllTopics().subscribe(topic => {
      this.topics = topic
    })
  }

  goToQuiz(topicId:Number) {
    this.router.navigate(["browse/"+topicId])
  }

}

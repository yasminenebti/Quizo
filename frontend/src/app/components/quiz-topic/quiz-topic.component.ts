import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResponse } from 'src/app/models/quiz-response';
import { QuizService } from 'src/app/services/quiz.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-quiz-topic',
  templateUrl: './quiz-topic.component.html',
  styleUrls: ['./quiz-topic.component.css']
})
export class QuizTopicComponent {

  topicId : Number = 0
  quizs : any
  quizTopic : String = ""

  constructor(
    private route : ActivatedRoute ,
    private router : Router, 
    private topicService: TopicService,
    private quizService : QuizService
     ) {

      this.topicId = this.route.snapshot.params['id']
      console.log(this.topicId)

      this.quizService.getQuizByTopic(this.topicId).subscribe(quiz => {
        const activeQuizs = quiz.filter(q => q.active === true);
        this.quizs = activeQuizs.slice(-4);

      })

      this.topicService.getTopicById(this.topicId).subscribe(quiz => {
        this.quizTopic = quiz.name
      })

    

  }

  goToQuiz(id : Number){
    this.router.navigate(["quiz/"+id])
  }

}

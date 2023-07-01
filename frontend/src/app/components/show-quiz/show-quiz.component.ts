import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResponse } from 'src/app/models/quiz-response';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent {
  quizs : Array<QuizResponse> = []

  constructor(
    private quizService : QuizService ,
    private router : Router
  ) {
    this.quizService.getAllQuiz().subscribe(quiz => {
      const activeQuizs = quiz.filter(q => q.active === true);
      this.quizs = activeQuizs.slice(-4);
    })
  }

  goToQuiz(id : Number){
    this.router.navigate(["quiz/"+id])
  }




}

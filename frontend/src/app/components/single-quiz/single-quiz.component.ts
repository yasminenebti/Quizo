import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResponse } from 'src/app/models/quiz-response';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-quiz',
  templateUrl: './single-quiz.component.html',
  styleUrls: ['./single-quiz.component.css']
})
export class SingleQuizComponent {
  qId : Number = 0;
  currentQuiz!: QuizResponse ;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private quizService : QuizService
  ) {

  


    this.qId = this.route.snapshot.params['id'];
    this.quizService.getQuizById(this.qId).subscribe({
      next : (response : QuizResponse) => {
        this.currentQuiz = response
      },
      error : (error) => {
        console.log(error)
      }
    })


  }

  startQuiz(quizId : Number) {
    Swal.fire({
    title: 'Time to quiz',
    text: 'Are you sure you want to start this quiz?',
    icon: 'question',
    iconColor:"",
    showCancelButton: true,
    confirmButtonColor: "var(--success-color)",
    cancelButtonColor: 'var(--warning-color)',
    confirmButtonText: 'start',
    cancelButtonText: 'Cancel'
    }).then((start) => {
      if (start.isConfirmed) {
        this.router.navigate(["start/"+quizId])
        
      }
    });
  }



}

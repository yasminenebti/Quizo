import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResponse } from 'src/app/models/quiz-response';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent {
  quizs : Array<QuizResponse> = []


  constructor(
    private quizService : QuizService ,
    private router : Router
  ) {
    this.quizService.getAllQuiz().subscribe(quiz => {
      this.quizs = quiz
    })
  }
  

  confirmDelete(quizId:Number) {
    Swal.fire({
    title: 'Confirm Delete',
    text: 'Are you sure you want to delete this quiz?',
    icon: 'warning',
    iconColor:"red",
    showCancelButton: true,
    confirmButtonColor: "var(--warning-color)",
    cancelButtonColor: 'var(--primary-color)',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel'
    }).then((toDelete) => {
      if (toDelete.isConfirmed) {
        this.quizService.deleteQuiz(quizId).subscribe({
          next : () => {
            this.quizs = this.quizs.filter((quiz) => quiz.id != quizId)
            Swal.fire('Deleted!', 'The quiz has been deleted.', 'success')
            
          },
          error : (error) => {
            Swal.fire(error)
          }
        })
        
      }
    });
  }
  getQuizById(id:Number){
    console.log(id)
    this.router.navigate(["/admin/quizView/"+id])
  }
  getQuestions(id : Number) {
    this.router.navigate(["/admin/question/quiz/"+id])
  }


}

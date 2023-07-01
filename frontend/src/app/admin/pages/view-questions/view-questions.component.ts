import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionResponse } from 'src/app/models/question-response';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent {
  quizId : Number;
  questions : Array<QuestionResponse> = []

  constructor(
    private questionService : QuestionService,
    private route : ActivatedRoute,
    private router : Router,
    private quizService : QuizService
  ) {
    this.quizId = this.route.snapshot.params['id']
    console.log(this.quizId)

    this.questionService.getQuizQuestion(this.quizId).subscribe(question => {
      this.questions = question
      console.log(this.questions)
    })
    
  }
  addNewQuestion() {
    this.router.navigate(["/admin/add-question"])
    this.quizService.setQuizId(this.quizId)

  }

  confirmDelete(qid : Number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this question?',
      icon: 'warning',
      iconColor:"red",
      showCancelButton: true,
      confirmButtonColor: "var(--warning-color)",
      cancelButtonColor: 'var(--primary-color)',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
      }).then((toDelete) => {
        if (toDelete.isConfirmed) {
          this.questionService.deleteQuestion(qid).subscribe({
            next : () => {
              this.questions = this.questions.filter((question) => question.id != qid)
              Swal.fire('Deleted!', 'The question has been deleted.', 'success')
              
            },
            error : (error) => {
              Swal.fire(error)
            }
          })
          
        }
      });

  }



}

import { TopicService } from 'src/app/services/topic.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResponse } from 'src/app/models/quiz-response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopicModel } from 'src/app/models/topic-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent {

  qId : Number = 0;
  currentQuiz! : QuizResponse;
  topics : Array<TopicModel> = [];
  quizForm! : FormGroup

  constructor(
    private route : ActivatedRoute,
    private quizService : QuizService,
    private topicService : TopicService,
    private router : Router
  ) { 
    this.quizForm = new FormGroup({
      id: new FormControl("" , [Validators.required]),
      name: new FormControl("" , [Validators.required]),
      active: new FormControl("" , [Validators.required]),
      marks: new FormControl("" , [Validators.required]),
      nbQuestions: new FormControl("" , [Validators.required]),
      topic: new FormControl("" , [Validators.required])
    });

    this.topicService.getAllTopics().subscribe(topic => {
      this.topics = topic
    })


    this.qId = this.route.snapshot.params['quizId'];
    this.quizService.getQuizById(this.qId).subscribe({
      next : (response : QuizResponse) => {
        this.currentQuiz = response
        //TODO: Assign the data of the current quiz to the quizForm
        this.quizForm.patchValue({
          id: this.currentQuiz.id,
          name:this.currentQuiz.name,
          active: this.currentQuiz.active,
          marks: this.currentQuiz.marks,
          nbQuestions: this.currentQuiz.nbQuestions,
          topic: this.currentQuiz.topic
        });
        console.log( this.quizForm.value)
      },
      error : (error) => {
        console.log(error)
      }
    })

    


    
  }
  EditQuiz(){
      console.log(this.quizForm.value)
      this.quizService.updateQuiz(this.qId , this.quizForm.value).subscribe({
        next : () => {
          Swal.fire("quiz updated successfully")
          this.router.navigate(["/admin/quiz"])
  
        },
        error : (error) => {
          Swal.fire(error)
        }
      })
      
  }

}



// this.quizForm.patchValue({
//   id: this.currentQuiz.id,
//   active: this.currentQuiz.active,
//   marks: this.currentQuiz.marks,
//   nbQuestions: this.currentQuiz.nbQuestions,
//   topic: this.currentQuiz.topic
// })
// console.log(this.quizForm)
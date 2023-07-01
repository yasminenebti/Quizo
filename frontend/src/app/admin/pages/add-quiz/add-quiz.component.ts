import { QuizService } from 'src/app/services/quiz.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicModel } from 'src/app/models/topic-model';
import { TopicService } from 'src/app/services/topic.service';
import Swal from 'sweetalert2';
import { QuizResponse } from 'src/app/models/quiz-response';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  quizForm : FormGroup
  quizRequest = {
    name: "",
    marks: 0,
    nbQuestions: 0,
    image: {} as File,
    active : false,
    topic: {
      id : 0
    } 

  }
  topics : Array<TopicModel> = [];

  constructor(
    private topicService : TopicService,
    private quizService : QuizService,
    private router : Router
  ) {
    this.quizForm = new FormGroup({
    name: new FormControl("" , [Validators.required]),
    marks: new FormControl("" , [Validators.required]),
    nbQuestions: new FormControl("" , [Validators.required]),
    image: new FormControl(""),
    active: new FormControl("" , [Validators.required]),
    topic: new FormControl("" , [Validators.required]),
    })

    this.topicService.getAllTopics().subscribe(topic => {
      this.topics = topic
    })
  }

  onImageSelected(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      this.quizForm.get('image')?.setValue(file);
    }
  }

  
  


  addQuiz(){
    this.quizRequest.name = this.quizForm.get('name')?.value;
    this.quizRequest.marks = this.quizForm.get('marks')?.value
    this.quizRequest.nbQuestions = this.quizForm.get('nbQuestions')?.value
    this.quizRequest.active = this.quizForm.get('active')?.value
    this.quizRequest.topic.id = this.quizForm.get('topic')?.value
    console.log(this.quizRequest)

    const imageFile = this.quizForm.get('image')?.value;
  if (imageFile instanceof File) {
    this.quizRequest.image = imageFile;
  }

  console.log(this.quizRequest);

    

  this.quizService.addNewQuiz(this.quizRequest).subscribe({
    next : (response : any) => {
      this.quizForm.reset()
      Swal.fire("quiz "+ response.name + " is added successfully")
      this.router.navigate(["/admin/quiz"])
      this.quizService.updateQuizImage(this.quizRequest.image,response.id).subscribe({
        next : (response : QuizResponse) => {
          console.log(response.image)
          console.log(response.name)
        }
      })

    },
    error : (error) => {
      Swal.fire(error)
    }
  })
  }

  

}

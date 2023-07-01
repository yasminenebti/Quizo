import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizResponse } from 'src/app/models/quiz-response';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  quizId : Number = 0
  questionForm : FormGroup
  selectedOptionForm: FormGroup;




  questionRequest = {
    content : "",
    options : [],
    answer : "",
  
  }

  quizzes : Array<QuizResponse> = []

  constructor(
    private quizService : QuizService,
    private questionService : QuestionService,
    private formBuilder : FormBuilder
  ) {
    this.quizId = this.quizService.getQuizId()
    console.log(this.quizId)

    this.questionForm = this.formBuilder.group({
      content : ["" , [Validators.required ]],
      options : this.formBuilder.array([]),
      answer: ["" , [Validators.required ]],
    })

    this.selectedOptionForm = this.formBuilder.group({
      optionContent : ["" , [Validators.required ]],
    })




    
    
  }

  get allOptions() {
    return this.questionForm.controls["options"] as FormArray
  }

  addNewOption(){
    this.selectedOptionForm = this.formBuilder.group({
      optionContent : ["" , [Validators.required ]],
    })
    
    this.allOptions.push(this.selectedOptionForm)
  }



  

  deleteOption(i:number) {
this.allOptions.removeAt(i)
  }


  addNewQuestion(){
    this.questionRequest.content = this.questionForm.get('content')?.value;
    this.questionRequest.answer = this.questionForm.get('answer')?.value;
    this.questionRequest.options = this.allOptions.value
    console.log(this.questionRequest)

  }
  

}

import { Location, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionResponse } from 'src/app/models/question-response';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {

  quizId : Number 
  questions : any
  responses: any = {};
  areAllQuestionsAnswered: boolean = false;
  totalPoints: number = 0;
  attemptCount: number = 0;
  isSubmit : boolean = false
  correctCount : number = 0
  timer : number = 0




  constructor(
    private questionService : QuestionService,
    private quizService : QuizService,
    private route : ActivatedRoute,
    private router : Router,
    private location : LocationStrategy
  ) {
    this.quizId = this.route.snapshot.params['id']

    this.questionService.getQuizQuestion(this.quizId).subscribe(question => {
      this.questions = question

      this.timer = this.questions.length * 15
      this.startTimer()

      this.questions.forEach((element: { id: string | number; }) => {
        this.responses[element.id] = ""
      });
      this.checkAreAllQuestionsAnswered()


    })

    history.pushState(null , '' , window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    })

  }

  getResult(option:any , question : QuestionResponse){
    this.responses[question.id.toString()] = option
    this.checkAreAllQuestionsAnswered()
  }

  submitQuiz(){
    

    Swal.fire({
      text : "are you sure you want to submit the quiz",
      confirmButtonColor: "var(--success-color)",
      showCancelButton: true,
      cancelButtonColor: 'var(--warning-color)',
      confirmButtonText: 'confirm',
      cancelButtonText: 'Cancel'
    }).then((quiz) => {
      if (quiz.isConfirmed) {
        this.calculateQuiz()
      }
    })

    
  }



  checkAreAllQuestionsAnswered(){
    this.areAllQuestionsAnswered = this.questions.every((question: { id: string | number; })=>{
      return this.responses[question.id] !== ""
    })
  }

  

  tryAgain() {
    this.responses = {};
    this.areAllQuestionsAnswered = false;
    this.totalPoints = 0;
    this.attemptCount = 0;
    this.isSubmit = false;
    this.correctCount = 0;
    this.timer = this.questions.length * 15;
    this.startTimer();
  
    this.router.navigate(['/start/', this.quizId]);
  }

  startTimer() {
    let intervalId = setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(intervalId); // Clear the interval using the assigned interval ID
        if (!this.isSubmit) { 
          this.calculateQuiz();
        }
      } else {
        this.timer--;
        console.log(this.timer)
      }
    }, 1000);
  }
  

  getTime(){
    let minutes = Math.floor(this.timer/60)
    let seconds = this.timer - minutes * 60
    return `${minutes} : ${seconds}`
  }

  calculateQuiz(){
    let incorrectCount = 0
    this.questions.forEach((question: { id: string | number; answer: any; }) => {
      if (this.responses[question.id] === question.answer) {
        this.correctCount++;
        this.totalPoints += 500;
      } else {
        incorrectCount++;
      }
    });
    console.log('Quiz submitted!');
    console.log('Correct answers: ', this.correctCount);
    console.log('Incorrect answers: ', incorrectCount);
    console.log('your points: ', this.totalPoints);
    console.log('Total quiz points: ', this.questions.length * 500);
    this.attemptCount++;
    this.isSubmit = true
   
    this.quizService.attemptQuiz(this.quizId).subscribe(()=> {
    console.log("attempted please")
    });

  }

}




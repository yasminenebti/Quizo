import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { AdminWelcomeComponent } from './admin/pages/admin-welcome/admin-welcome.component';
import { ViewTopicsComponent } from './admin/pages/view-topics/view-topics.component';
import { AddTopicsComponent } from './admin/pages/add-topics/add-topics.component';
import { AddQuizComponent } from './admin/pages/add-quiz/add-quiz.component';
import { ViewQuizComponent } from './admin/pages/view-quiz/view-quiz.component';
import { UpdateComponentComponent } from './admin/pages/update-component/update-component.component';
import { ViewQuestionsComponent } from './admin/pages/view-questions/view-questions.component';
import { AddQuestionComponent } from './admin/pages/add-question/add-question.component';
import { HomeComponent } from './components/home/home.component';
import { QuizTopicComponent } from './components/quiz-topic/quiz-topic.component';
import { SingleQuizComponent } from './components/single-quiz/single-quiz.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';


const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"", component:HomeComponent},
  {path:"browse/:id" , component:QuizTopicComponent},
  {path:"quiz/:id" , component:SingleQuizComponent},
  {path:"start/:id" , component:StartQuizComponent},
  {
     path : "admin" , 
     component:AdminDashComponent, 
     canActivate:[AdminGuard],
     children:[
      {path : "",component : AdminWelcomeComponent},
      {path : "profile",component : AdminProfileComponent},
      {path : "topics",component : ViewTopicsComponent},
      {path : "add-topic",component : AddTopicsComponent},
      {path : "quiz",component : ViewQuizComponent},
      {path : "quizView/:quizId",component : UpdateComponentComponent},
      {path : "add-quiz", component : AddQuizComponent},
      {path : "question/quiz/:id",component : ViewQuestionsComponent,pathMatch: "prefix"},
      {path:"add-question",component : AddQuestionComponent }
     ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

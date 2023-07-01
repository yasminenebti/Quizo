import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { AdminWelcomeComponent } from './admin/pages/admin-welcome/admin-welcome.component';
import {MatTableModule} from '@angular/material/table';
import { ViewTopicsComponent } from './admin/pages/view-topics/view-topics.component';
import { AddTopicsComponent } from './admin/pages/add-topics/add-topics.component';
import { AddQuizComponent } from './admin/pages/add-quiz/add-quiz.component';
import { ViewQuizComponent } from './admin/pages/view-quiz/view-quiz.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { UpdateComponentComponent } from './admin/pages/update-component/update-component.component';
import { ViewQuestionsComponent } from './admin/pages/view-questions/view-questions.component';
import { AddQuestionComponent } from './admin/pages/add-question/add-question.component';
import { HomeComponent } from './components/home/home.component';
import { ShowQuizComponent } from './components/show-quiz/show-quiz.component';
import { QuizTopicComponent } from './components/quiz-topic/quiz-topic.component';
import { SingleQuizComponent } from './components/single-quiz/single-quiz.component';
import {MatChipSet, MatChipsModule} from '@angular/material/chips';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule  , NgxUiLoaderHttpModule} from 'ngx-ui-loader';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashComponent,
    AdminSidebarComponent,
    AdminProfileComponent,
    AdminWelcomeComponent,
    ViewTopicsComponent,
    AddTopicsComponent,
    AddQuizComponent,
    ViewQuizComponent,
    UpdateComponentComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    HomeComponent,
    ShowQuizComponent,
    QuizTopicComponent,
    SingleQuizComponent,
    StartQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground : true
    }),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

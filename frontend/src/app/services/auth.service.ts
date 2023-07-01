import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';
import { Observable , of, throwError} from 'rxjs';
import { baseUrl } from './helper';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { map , tap , catchError } from 'rxjs/operators';
import { UserRequest } from '../models/user-request';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) {
   }

   register(registerRequest : RegisterRequest) : Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${baseUrl}/api/v1/auth/register` , registerRequest);

  }

  login(loginRequest : LoginRequest) :  Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${baseUrl}/api/v1/auth/authenticate` , loginRequest).pipe(
      map(data => {
      localStorage.setItem('message', data.message);
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToke', data.refreshToke);
      return data;
    }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error?.error?.message || 'You need to verify your account first';
          return throwError(()=>errorMessage);
        })
      );
   

  }

  getUserRole(): Observable<String | null> {
    return this.getCurrentUser().pipe(
      map((user: UserRequest) => user.role),
      catchError(() => of(null))
    );
  }

  getToken(){
    return localStorage.getItem("token")
  }

  refreshToken() {
    return this.http.post<LoginResponse>(`${baseUrl}/api/v1/auth/refreshToken`, null)
      .pipe(tap(response => {
        localStorage.removeItem('token');
        localStorage.setItem('token', response.token);
      }));
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')
    if (token == undefined || token =="" || token ==null) {
      return false;
    } else {
      return true
    }

  }

  logout(){
    localStorage.clear()
    return true
  }

  

  
  

  getCurrentUser() : Observable<UserRequest>{
    return this.http.get<UserRequest>(`${baseUrl}/api/v1/auth/currentUser`);

  }
  
}

//let user = this.getUser()
//return user.role;
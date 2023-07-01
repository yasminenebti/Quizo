import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService : AuthService,
    private router : Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEvent<any>>>{


    const jwtToken = this.authService.getToken()


    if(jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
      }
      })
    } else {
      this.authService.logout()
      this.router.navigate(["/login"])
      console.log("not found")
    }
    return next.handle(request)
   
  }
}

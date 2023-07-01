
import { Component } from '@angular/core';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/models/login-response';
import Swal from 'sweetalert2';
import { UserRequest } from 'src/app/models/user-request';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  loginRequest : LoginRequest

  constructor(
    private authService : AuthService,
    private router : Router
  ) {
    
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });

    this.loginRequest = {
      email : "",
      password : "",
    }

  }

  login(){
    
    this.loginRequest.email = this.loginForm.get('email')?.value;
    this.loginRequest.password = this.loginForm.get("password")?.value;
    this.authService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse) => {
        this.router.navigate(["/"])

        this.authService.getCurrentUser().subscribe({
          next : () => {
            
            this.authService.getUserRole().subscribe({
              next : (role : String | null) => {
                if (role === "USER") {
                  // redirect user
                  window.location.href = "/";
                } else if (role === "ADMIN") {
                  // redirect admin
                  window.location.href = "/admin";
                } else {
                  this.authService.logout();
                  window.location.href = "/login";
                }
              },
              error : (error) => {console.log("error getting user role ",error)}
            })
          },
          error : (error) => {
            console.log("Error getting current user" , error)
          }
        })
        
      },
      error: (errorMessage: string) => {
        Swal.fire(errorMessage)
      }
    })


  }

  cancel() {
    this.loginForm.reset();
  }


}

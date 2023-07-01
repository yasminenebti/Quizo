import { MatSnackBar , MatSnackBarModule } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { RegisterRequest } from 'src/app/models/register-request';
import { RegisterResponse } from 'src/app/models/register-response';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest : RegisterRequest
  registerForm : FormGroup

  constructor(
    private authService : AuthService,
    private router : Router,
  ){

    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      phone: new FormControl(0, Validators.required),
    });

    this.registerRequest = {
      username : "",
      firstName : "",
      lastName : "",
      email : "",
      password : "",
      phone : 0
    }
  }

  

  register(){
  
    this.registerRequest.username = this.registerForm.get("username")?.value
    this.registerRequest.firstName = this.registerForm.get("firstName")?.value
    this.registerRequest.lastName = this.registerForm.get("lastName")?.value
    this.registerRequest.email = this.registerForm.get("email")?.value
    this.registerRequest.password = this.registerForm.get("password")?.value
    this.registerRequest.phone = this.registerForm.get("phone")?.value


    this.authService.register(this.registerRequest).subscribe({
      next: (response: RegisterResponse) => {
        Swal.fire(response.message , "few steps ahead " + this.registerRequest.username)
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        
      },
      error: () => {
        Swal.fire("Error")
      }
    })
  }
  cancel() {
    this.registerForm.reset();
  }
}

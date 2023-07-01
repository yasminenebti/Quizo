import { Component } from '@angular/core';
import { UserRequest } from 'src/app/models/user-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {

  admin: UserRequest = {} as UserRequest;

  constructor(
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next : (user : UserRequest) => {
        this.admin = user;
      },
      error : (error) => {
        console.log("error getting current user" , error)
      }
    })
  }


}

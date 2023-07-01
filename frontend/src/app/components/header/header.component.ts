import { Component } from '@angular/core';
import { UserRequest } from 'src/app/models/user-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent   {
  userName: String ="";


  constructor(
    public authService : AuthService
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.getCurrentUser().subscribe({
        next: (user: UserRequest) => {
          this.userName = user.name;
        },
        error: (error) => {
          console.log("Error getting current user:", error);
        }
      });
    }
    else {
      console.log("no one is logged in")
    }
  }

  

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}

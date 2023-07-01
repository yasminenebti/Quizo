import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable , map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private authService : AuthService,
    private router : Router
  ) {}

  canActivate(): 
  Observable<boolean 
  | UrlTree> 
  | Promise<boolean 
  | UrlTree> 
  | boolean 
  | UrlTree {
    
    if (this.authService.isLoggedIn() && this.authService.getUserRole()) {
      return this.authService.getUserRole().pipe(
        map((role: String | null) => {
          if (role === "ADMIN") {
            return true;
          } else {
            this.router.parseUrl('/');
            return false;
          }
        })
      );
    } else {
      this.router.parseUrl('/');
      return false;
    }
  }
  
}

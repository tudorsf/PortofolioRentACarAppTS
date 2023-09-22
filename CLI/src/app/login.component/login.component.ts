import { Component } from '@angular/core';
import { UserAuth } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggedUser } from '../models/loggedUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  
})



export class LoginComponent {

  loggedIn = false;
  constructor(private loginService: RegisterService, private router: Router, private cookieService: CookieService, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

 
  user: UserAuth = {
      userName: '',
      password: '',
      roleRef: 0
    };

    loggedUser: LoggedUser = {
      id: 0,
      userName: '',
      token: '',
      roleRef: 0 
    }
   

   login(){

    this.loginService.login(this.user.userName, this.user.password)
    .subscribe({
      next: (response: any) => {
          this.loggedUser.id = response.id;
          this.loggedUser.userName = response.username;
          this.loggedUser.token = response.token; 
          this.loggedUser.roleRef = response.roleRef
          this.cookieService.set('user', JSON.stringify(this.loggedUser));
          this.authService.updateLoginStatus(true);
          this.router.navigate(['/home']);
       
          
       
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  logOff(){
    this.authService.logOff();
  }

  

} 
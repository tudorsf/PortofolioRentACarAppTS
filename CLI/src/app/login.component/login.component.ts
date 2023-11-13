import { Component } from '@angular/core';
import { UserAuth } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggedUser } from '../models/loggedUser';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from '../services/error.service';




@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
  
})



export class LoginComponent {

  loggedIn = false;
  constructor(private loginService: RegisterService, private router: Router, private cookieService: CookieService, private authService: AuthService,private errorService: ErrorService, private modalService: NgbModal) {
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
      role: '' 
    }
   
    errorMessage: string = '';

   login(){

    this.loginService.login(this.user.userName, this.user.password)
    .subscribe({
      next: (response: any) => {
          this.loggedUser.id = response.id;
          this.loggedUser.userName = response.username;
          this.loggedUser.token = response.token; 
          this.loggedUser.role = response.roleName;
          this.cookieService.set('user', JSON.stringify(this.loggedUser));
          this.authService.updateLoginStatus(true);
          console.log(this.loggedUser.role)
          if(this.loggedUser.role == 'client'){
            this.router.navigate(['/client'])
          } else if(this.loggedUser.role == 'company'){
            this.router.navigate(['/company'])
          } else if(this.loggedUser.role == 'sysAdmin') {
            this.router.navigate(['/home']);
          } 
       
          
       
      },
      error: (error) => {
        let errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        this.errorService.openErrorModal(errorMessage);
        
      }
    })

  }

  logOff(){
    this.authService.logOff();
  }

  

} 
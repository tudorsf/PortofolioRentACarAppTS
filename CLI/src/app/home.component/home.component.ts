import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedUser } from '../models/loggedUser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  
})
export class HomeComponent {
  
  loggedIn = false;

  constructor(private authService: AuthService, private cookieService: CookieService){
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

  logOff(){
    this.authService.logOff()
    }

    getUser(){
      const user: LoggedUser = JSON.parse(this.cookieService.get('user'));
        console.log(user);
    }
  }

  


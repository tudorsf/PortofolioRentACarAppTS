import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoggedUser } from '../models/loggedUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  register(username: string, password: string, roleRef: number) {
    const registerData = {
      username: username,
      password: password,
      roleRef: roleRef
    };

    
    return this.http.post('https://localhost:7030/api/Auth/register', registerData);
  }

  login(username: string, password: string) {
    const loginData = {
      username: username,
      password: password,
      
    };

    
    return this.http.post('https://localhost:7030/api/Auth/login', loginData);

  }

  

  /*logOff(){
    const logOffData: LoggedUser = JSON.parse((this.cookieService.get('user'));

    
    return this.http.post('https://localhost:7030/api/Auth/login', logOffData);
  }*/
  /*isLoggedIn() {
    return this.cookieService.check('user');
  }

  logOff(){
    this.cookieService.delete('user');
    this.isLoggedIn();
    this.router.navigate(['/login']);  
  }*/

}

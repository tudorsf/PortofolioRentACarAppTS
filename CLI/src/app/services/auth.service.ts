import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggedUser } from '../models/loggedUser';

@Injectable({
    providedIn: 'root'
  })

export class AuthService {

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);

    constructor(private cookieService: CookieService, private router: Router, private http: HttpClient){
        this.checkLoginStatus();
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
      }
    
     
      updateLoginStatus(isLoggedIn: boolean): void {
        this.isLoggedInSubject.next(isLoggedIn);
      }

    checkCookieStatus() {
        return this.cookieService.check('user');
    }

    checkLoginStatus(){
        if (this.checkCookieStatus()) {
            this.updateLoginStatus(true);
          }
    }

    getCurrentUser(){
        const user: LoggedUser = JSON.parse(this.cookieService.get('user'));
        return user;
    }

    getCurrentUserRole(){
     const userData = this.cookieService.get('user');
        try {
          if (userData) {
                const user: LoggedUser = JSON.parse(userData);
                if (user) {
                  return user.role;
                }
              }
            } catch{
                return "";

            }
         return "";
    }
        
    

    logOff(){
        const logOffData: LoggedUser = JSON.parse(this.cookieService.get('user'));
        this.http.delete('https://localhost:7262/api/Auth/LogOff/'+logOffData.id).subscribe({
            next: () => {
                this.cookieService.delete('user');
                this.updateLoginStatus(false);
                this.router.navigate(['/login']);  
            },
            error: (error: any) => {
                console.log(error)
            }

        })
    }
}
    

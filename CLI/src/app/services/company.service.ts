import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { AuthService } from './auth.service';
import { Company } from '../models/BL/company.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class CompanyService {

  


    constructor(private http: HttpClient, private authService: AuthService) {}

   
    
    getProfile(): Observable<any>{
        const currentUser = this.authService.getCurrentUser();
        return this.http.get('https://localhost:7262/api/Company/GetComp/'+ currentUser.id);
          
    }

   

    createProfile(company: Company): Observable<any>{
        return this.http.post('https://localhost:7262/api/Company/addProfile', company);
    }

    

    

    

    

   

    

    
    
}
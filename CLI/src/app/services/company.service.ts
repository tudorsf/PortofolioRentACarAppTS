import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { AuthService } from './auth.service';
import { Company } from '../models/BL/company.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class CompanyService {

    private companySubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public company$: Observable<any> = this.companySubject.asObservable();
  




    constructor(private http: HttpClient, private authService: AuthService) {}

   
    
    /*getProfile(): Observable<any>{
        const currentUser = this.authService.getCurrentUser();
        return this.http.get('https://localhost:7262/api/Company/GetComp/'+ currentUser.id);
          
    }

   

    createProfile(company: Company): Observable<any>{
        return this.http.post('https://localhost:7262/api/Company/addProfile', company);
    }*/

    getProfile(): Observable<any>{
        const currentUser = this.authService.getCurrentUser();
        return this.http.get('https://localhost:7262/api/Company/GetComp/'+ currentUser.id).pipe(
            tap((company) => this.setCompany(company))
        )
          
    }

   

    createProfile(company: Company): Observable<any>{
        return this.http.post('https://localhost:7262/api/Company/addProfile', company).pipe(
            tap((company) => this.setCompany(company))
            
        )
    }

    setCompany(company: any): void {
        this.companySubject.next(company);
        console.log(company);
    }

    getCompany(): any {
        console.log(this.companySubject.value);
        return this.companySubject.value;
        
    }



    

    

    

    

   

    

    
    
}
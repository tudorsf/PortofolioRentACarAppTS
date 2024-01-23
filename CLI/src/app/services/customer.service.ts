import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer } from '../models/BL/customer.model';

@Injectable({
    providedIn: 'root'
  })

  export class CustomerService {

    private customerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public customer$: Observable<any> = this.customerSubject.asObservable();
  


    constructor(private http: HttpClient, private authService: AuthService) {}

   
    
    getProfile(): Observable<any>{
        const currentUser = this.authService.getCurrentUser();
        return this.http.get('https://localhost:7262/api/Customer/GetCust/'+ currentUser.id).pipe(
            tap((customer) => this.setCustomer(customer))
        );
          
    }
    
    createProfile(customer: Customer): Observable<any>{
        return this.http.post('https://localhost:7262/api/Customer/addProfile', customer).pipe(
            tap((customer) => this.setCustomer(customer))
        );
    }

    setCustomer(customer: any): void {
        this.customerSubject.next(customer);
    }

    getCustomer(): any {
        console.log(this.customerSubject.value);
        return this.customerSubject.value;
        
    }

    
}


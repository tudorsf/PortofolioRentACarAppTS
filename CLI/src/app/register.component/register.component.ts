import { Component } from '@angular/core';
import { UserAuth } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
  
})



export class RegisterComponent {
    constructor(private registerService: RegisterService, private router: Router, private errorService:  ErrorService/*, private modalService: NgbModal*/ ) {}
user: UserAuth = {
    
    userName: '',
    password: '',
    roleRef: 0
  }

  company: boolean = false;
  customer: boolean = false;

  confirmPass = '';

  selectCompany(){
    this.user.roleRef = 2
  }

  selectCustomer(){
    this.user.roleRef = 3
  }

  
  register(){
     if(this.confirmPass == this.user.password && this.user.roleRef != 0){
        
        console.log(this.user);

        
        this.registerService.register(this.user.userName, this.user.password, this.user.roleRef)
      .subscribe(
        (response) => {
          // Handle successful login response here
          console.log('Registered successfully', response);
          this.router.navigate(['/login']);
        },
        (error) => {
           // Handle registration error here
            let errorMessage = 'An error occurred. Please try again.'; // Default error message

            if (error.error instanceof ErrorEvent) {
              // Client-side error
              errorMessage = error.error.message;
              console.log(errorMessage);
            } else if (error.error && error.error.message) {
              // Server-side error with a specific error message
              errorMessage = error.error.message;
              console.log(errorMessage);

      } else {
        // Server-side error without a specific error message
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.log(errorMessage);

      }

      // Save the error message for the error modal
        this.errorService.changeErrorMessage(errorMessage);
        //this.modalService.open(errorMessage);
          
        }
      );
     } else if(this.user.roleRef == 0){
      this.errorService.changeErrorMessage('please select a user role');
     } else if(this.confirmPass != this.user.password) {
      this.user.password = '';
      this.confirmPass = '';
      console.log('passwords dont match');
      this.errorService.changeErrorMessage('please select a user role');
   }
     
    
  }
}

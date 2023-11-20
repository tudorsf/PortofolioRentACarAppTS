import { Component } from '@angular/core';
import { UserAuth } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';


@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../app.component.css']
  
})



export class RegisterComponent {
    constructor(private registerService: RegisterService, private router: Router, private errorService:  ErrorService, private modalService: NgbModal ) {}

    checkForm = true;
    

user: UserAuth = {
    
    userName: '',
    password: '',
    roleRef: 0
  }

  company: boolean = false;
  customer: boolean = false;

  confirmPass = '';

errorMessage = '';
  selectCompany(){
    this.user.roleRef = 2
  }

  selectCustomer(){
    this.user.roleRef = 3
  }

  
  register(){
     if(this.user.userName != "" && this.user.password != "" && this.confirmPass == this.user.password && this.user.roleRef != 0){
        
       
        this.registerService.register(this.user.userName, this.user.password, this.user.roleRef)
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
            
          let errorMessage:string;
           if(error.status == 400){
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
  
            } else {
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            this.errorService.openErrorModal(this.errorMessage);
        }
      );
     } else if(this.user.roleRef == 0){
        let errorMessage = 'Please select a role'
        this.errorService.openErrorModal(errorMessage);      
     } else if(this.confirmPass != this.user.password) {
        this.user.password = '';
        this.confirmPass = '';
        let errorMessage = 'Passwords dont match'
        this.errorService.openErrorModal(errorMessage);   }
   }

  
}

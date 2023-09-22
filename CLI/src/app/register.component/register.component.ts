import { Component } from '@angular/core';
import { UserAuth } from '../models/user.model';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  
})
export class RegisterComponent {
    constructor(private registerService: RegisterService, private router: Router) {}
user: UserAuth = {
    id: 0,
    userName: '',
    password: '',
    roleRef: 0
  }

  company: boolean = false;
  customer: boolean = false;

  confirmPass = '';

  selectCompany(){
    this.user.roleRef = 1
  }

  selectCustomer(){
    this.user.roleRef = 2
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
          // Handle login error here
          console.error('Register failed', error);
        }
      );
     } else if(this.user.roleRef == 0){
      console.log('please select a role')
     } else {
      this.user.password = '';
      this.confirmPass = '';
      console.log('passwords dont match, please select a role');
   }
     
    
  }
}

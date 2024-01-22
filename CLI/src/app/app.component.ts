import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggedUser } from './models/loggedUser';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { ErrorService } from './services/error.service';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/BL/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LoginCLI';
  
  userRole:string;

  customer: Customer | null = null;

  constructor(private authService: AuthService, private customerService: CustomerService){
    this.userRole = this.authService.getCurrentUserRole();
   }

   ngOnInit(): void {
     if(this.userRole == 'client'){
      this.customerService.getProfile().subscribe(
        (data: any) => {
          console.log(data + "data from backend")
          if(data != null){
            try{
              this.customer = data;
              //this.customerService.setCustomer(this.customer);
              console.log(this.customer)
            }
            catch (error) {
              console.error('Error creating profile:', error);
            }
            console.log(this.customer + " company from backend");
          }
         
        },
        (error: any) => {
          console.error('Error creating profile:', error);
        }
      );
     }
   }

 
    get dashboardLink(): string {
    
      if (this.userRole == 'client') {
        return 'client';
      } else if (this.userRole == 'company') {
        return 'company';
      } else  {
        return '/login';
      }
    }
  
  

  

}

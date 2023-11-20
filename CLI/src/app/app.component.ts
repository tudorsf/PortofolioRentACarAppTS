import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggedUser } from './models/loggedUser';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoginCLI';
  
  userRole:string;

  constructor(private authService: AuthService){
    this.userRole = this.authService.getCurrentUserRole();
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

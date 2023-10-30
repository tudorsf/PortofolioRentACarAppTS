import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoggedUser } from './models/loggedUser';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { ErrorService } from './services/error.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoginCLI';
  
  /*constructor(private modalService: NgbModal, private errorService: ErrorService){

    let errorSub$ = this.errorService.currentErrorMessage.subscribe((errorMessage: string) => { this.modalService.open(errorMessage) })

  }*/

  

}

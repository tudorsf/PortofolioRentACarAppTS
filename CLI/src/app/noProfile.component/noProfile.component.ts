import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CliProfileModalComponent } from "../client/CliProfile/cliProfile-modal.component";
import { ProfileModalComponent } from "../company/profile-modal/profile-modal.component";

@Component({
    selector: 'noProfile-component',
    templateUrl: './noProfile.component.html',
    styleUrls: ['./noProfile.component.css']
   
    
  })

  export class NoProfileComponent{
    
    private modalRef: NgbModalRef | null = null;

    constructor(private authService: AuthService,
                private modalService: NgbModal){

    }

    openModal(){
        const userRole = this.authService.getCurrentUserRole();
        if (userRole == 'client'){
            this.modalRef = this.modalService.open(CliProfileModalComponent, { centered: true });
        } else if(userRole == 'company'){
          this.modalService.open(ProfileModalComponent)
        }    
      }
  }
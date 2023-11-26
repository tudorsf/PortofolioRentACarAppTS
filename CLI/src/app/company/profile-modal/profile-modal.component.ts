import { Component,  Output, EventEmitter, NgZone } from '@angular/core';
import { Company } from 'src/app/models/BL/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorModalComponent } from 'src/app/shared/error-modal/error-modal.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
    selector: 'profile-modal',
    templateUrl: './profile-modal.component.html',
   styleUrls:['profile-modal.component.css']
    
  })

  export class ProfileModalComponent {
    private modalRef: NgbModalRef | null = null;

   
    
    company: Company = {
        id: 0,
        userREF: 0,
        name: '',
        city: '',
        rating: 0,
        cars: []
    }


    constructor(private authService: AuthService,
                private companyService: CompanyService,
                private profileService: ProfileService,
                private errorService: ErrorService){}

    createProfile(){
        this.company.userREF = this.authService.getUserREF();
        if(this.company){
          this.companyService.createProfile(this.company).subscribe(
            (response: any) => {
              if(response != null){
                this.company = response;
                if(this.company){
                  this.profileService.setData(this.company);
                  this.modalRef?.close();

                 }
              }
             
            },
            
            (error) => {
              console.error('Error creating profile:', error);
              
            }
          );
        }
          
        
      

    }

    closeModal(){
      console.log("this is not working yet");
    }

   

    
    
   

   
  }

  


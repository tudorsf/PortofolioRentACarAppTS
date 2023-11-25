import { Component,  Output, EventEmitter, NgZone } from '@angular/core';
import { Company } from 'src/app/models/BL/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorModalComponent } from 'src/app/shared/error-modal/error-modal.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
    selector: 'profile-modal',
    templateUrl: './profile-modal.component.html',
   styleUrls:['profile-modal.component.css']
    
  })

  export class ProfileModalComponent {
    private modalRef: NgbModalRef | null = null;

   
    
    company: Company = {
        Id: 0,
        UserREF: 0,
        Name: '',
        City: '',
        Rating: 0,
        Cars: []
    }


    constructor(private authService: AuthService, private companyService: CompanyService, private profileService: ProfileService){}

    createProfile(){
        this.company.UserREF = this.authService.getUserREF();
        if(this.company){
          this.companyService.createProfile(this.company).subscribe(
            (response: any) => {
              if(response != null){
                this.company = response;
                if(this.company){
                  this.profileService.setData(this.company);
                 }
              }
             
            },
            
            (error) => {
              console.error('Error creating profile:', error);
              
            }
          );
        }
          
        
      
       //console.log(this.company);

    }

   

    
    
   

   
  }

  


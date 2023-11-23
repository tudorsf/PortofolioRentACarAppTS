import { Component,  Output, EventEmitter } from '@angular/core';
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
        id: 0,
        userREF: 0,
        name: '',
        city: '',
        rating: 0,
        cars: []
    }

    constructor(private authService: AuthService, private companyService: CompanyService, private profileService: ProfileService){}

    createProfile(){
        this.company.userREF = this.authService.getUserREF();
       this.companyService.createProfile(this.company).subscribe(
        (response) => {
          console.log('Profile created successfully:', response);
          //this.profileService.setData(response);
        },
        (error) => {
          console.error('Error creating profile:', error);
          
        }
      );
       console.log(this.company);

    }

   

    
    
   

   
  }

  


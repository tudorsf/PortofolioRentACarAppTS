import { Component,  Output, EventEmitter, NgZone } from '@angular/core';
import { Company } from 'src/app/models/BL/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { ErrorModalComponent } from 'src/app/shared/error-modal/error-modal.component';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
        address: '',
        phoneNumber: '',
        eMail: '',
        rating: 0,
        cars: []
    }

    companyForm: FormGroup;

    info = false;

    constructor(private authService: AuthService,
                private companyService: CompanyService,
                private profileService: ProfileService,
                public activeModal: NgbActiveModal,
                private errorService: ErrorService,
                private fb: FormBuilder)
                {
                  
                    this.companyForm = this.fb.group({
                      name: ['', Validators.required],
                      city: ['', Validators.required],
                      address: ['', Validators.required],
                      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
                      eMail: ['', [Validators.required, Validators.email]],
                    });
                }

    createProfile(){
        this.company =  this.companyForm.value;
        console.log(this.company);
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

    askInfo(){
      this.info = !this.info;
    }

  

    showMessage(form:any, formInput:any): boolean {
      const control = form.get(formInput);
    
      return control?.invalid && control?.dirty && control?.touched && control?.value;
    }
   

    
    
   

   
  }

  


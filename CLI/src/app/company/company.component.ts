import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Company } from '../models/BL/company.model';
import { CompanyService } from '../services/company.service';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  private modalRef: NgbModalRef | null = null;

 
  company: Company | null = null;

 constructor(private companyService: CompanyService, 
             private modalService: NgbModal, 
             private profileService: ProfileService) 
          {}

  ngOnInit(): void {

    this.companyService.getProfile().subscribe(
      (data: any) => {
        console.log(data + "data from backend")
        if(data != null){
          try{
            this.company = data;
          }
          catch (error) {
            console.error('Error creating profile:', error);
          }
          console.log(this.company + " company from backend");
        }
       
      },
      (error: any) => {
        console.error('Error creating profile:', error);
      }
    );
    
    if(!this.company){
      this.profileService.data$.subscribe((data) => {
        if(data != null){
          this.company = data;
          this.closeModal();
         }
      });
    }
  }

  
  
  openModal(){
    this.modalRef = this.modalService.open(ProfileModalComponent, { centered: true });
  }

  closeModal(){
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }

  /*checkCompanyPopulated(): boolean {
    console.log(JSON.stringify(this.company) + "from check company");
    console.log(this.company?.name);
    console.log(this.company?.city);
    console.log(this.company?.rating);
    return !!this.company && !!this.company.name && !!this.company.city && !!this.company.rating;
  }*/

  
  

  
 
    

  

}

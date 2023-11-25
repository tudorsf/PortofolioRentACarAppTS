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

  isCompanyPopulated = false;

 constructor(private authService: AuthService, private companyService: CompanyService, private modalService: NgbModal, private profileService: ProfileService) {
  this.companyService.getProfile().subscribe(
    (data: any) => {
      console.log(data + "data from backend")
      if(data != null){
        try{
          this.company = data;
          this.isCompanyPopulated = this.checkCompanyPopulated();

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

  this.profileService.data$.subscribe((data) => {
    if(data != null){
      try{
        this.company = data;
      console.log(this.company);
      this.isCompanyPopulated = this.checkCompanyPopulated();
      console.log(this.isCompanyPopulated);
      } catch(error){
        console.log(error)
      }
      
     }
    console.log(this.company + ' from profile service');
  });
 }

  ngOnInit(): void {
    

    
   
  
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

  checkCompanyPopulated(): boolean {
    return !!this.company && !!this.company.Name && !!this.company.City && !!this.company.Rating && !!this.company.Cars;
  }

  
  

  
 
    

  

}

import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Company } from '../models/BL/company.model';
import { CompanyService } from '../services/company.service';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  private modalRef: NgbModalRef | null = null;

 
  company: Company = {
    id: 0,
    userREF: 0,
    name: '',
    city: '',
    rating: 0,
    cars: []
  }

  receivedData: any;

 constructor(private authService: AuthService, private companyService: CompanyService, private modalService: NgbModal, private profileService: ProfileService) {
    this.companyService.getProfile().subscribe(
      (data: any) => {
        this.company = data;
      },
      (error: any) => {
        console.error('Error creating profile:', error);
      }
    );
  

    
   }

  ngOnInit(): void {
    this.profileService.data$.subscribe((data) => {
     
      this.company = data;

     
    });
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

  
  

  
 
    

  

}

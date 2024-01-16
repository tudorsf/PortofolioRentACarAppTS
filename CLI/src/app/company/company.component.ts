import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Company } from '../models/BL/company.model';
import { CompanyService } from '../services/company.service';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { StreetMapService } from '../services/streetMap.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/BL/reservation.model';
import { Car } from '../models/BL/car.model';
import { ReservationsModalComponent } from './reservations-modal/reservations-modal.component';




@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css',
'../app.component.css']
})
export class CompanyComponent implements OnInit {

  private modalRef: NgbModalRef | null = null;


 
  company: Company | null = null;

  address: string = '';

  reservations: Reservation[] = [];
  
  cars: Car[] = [];

  showDropdown = false;

 constructor(private companyService: CompanyService, 
             private modalService: NgbModal, 
             private profileService: ProfileService,
             private streetService: StreetMapService,
             private router: Router) 
          {}

  ngOnInit(): void {

    this.companyService.getProfile().subscribe(
      (data: any) => {
        console.log(data + "data from backend")
        if(data != null){
          try{
            this.company = data;
            this.company!.cars.forEach((car) => {
               this.reservations = [ ...car.reservations];
               console.log(this.reservations);
            });
            //console.log(this.company!.cars);
            //this.check();

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

  openCarModal(){
    console.log("");
  }

  createMap(){
    console.log(this.streetService.createMap())
  }

  navigate(){
    this.router.navigate(['/add-car']);
  }

  

  toggleDropdown(car: any): void {
    this.showDropdown = !this.showDropdown;
  }

  openReservationModal(carReservations: Reservation[]): void {
    const modalRef = this.modalService.open(ReservationsModalComponent, { size: 'lg' });
    modalRef.componentInstance.reservations = carReservations;
  }

  
  
  

}

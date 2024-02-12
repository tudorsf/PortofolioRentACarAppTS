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
import { Engine,DoorsNr, GearboxType,CarType } from '../models/enums/carEnums';
import { UtilityService } from '../services/utility.service';





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

  Engine = Engine;
  DorsNr = DoorsNr;
  CarType = CarType;
  GearboxType = GearboxType;

  isLoading: boolean = true;

  showDropdown = false;

 
 constructor(private companyService: CompanyService, 
             private modalService: NgbModal, 
             private profileService: ProfileService,
             private streetService: StreetMapService,
             private router: Router,
             private utilityService: UtilityService) 
          {}

  ngOnInit(): void {


    this.companyService.getProfile().subscribe(
      (data: any) => {
        if(data != null){
          try{
            this.company = data;
            this.company!.cars.forEach((car) => {

               this.reservations = [ ...car.reservations];
              console.log(this.company?.cars);
               console.log(this.reservations);
            });
            this.isLoading = false;
           
          }
          catch (error) {
            console.error('Error creating profile:', error);
            //this.isLoading = false;
          }
        } else if(data == null){
          this.isLoading = false;
        }
       
      },
      (error: any) => {
        console.error('Error creating profile:', error);
        this.isLoading = false;
      }
    ) 

    this.companyService.company$.subscribe((value) => {
      this.company = value;
      console.log(this.company, 'home component');
    });

   
    console.log(this.isLoading);


    
    
  }

  


  openCarModal(){
    console.log("");
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

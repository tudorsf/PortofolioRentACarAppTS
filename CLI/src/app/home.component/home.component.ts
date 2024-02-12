import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedUser } from '../models/loggedUser';
import { CookieService } from 'ngx-cookie-service';
import { CarsService } from '../services/cars.service';
import { Car } from '../models/BL/car.model';
import { Company } from '../models/BL/company.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReservationsModalComponent } from './addReservation/addRes-modal.component';
import { Customer } from '../models/BL/customer.model';
import { CustomerService } from '../services/customer.service';
import { ProfileService } from '../services/profile.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { Engine,DoorsNr, GearboxType,CarType } from '../models/enums/carEnums';


@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
 
  
})



export class HomeComponent implements OnInit{
    
  
  loggedIn = false;
  
  cars: Car[] = [];

  customer!: Customer;

  Engine = Engine;
  DorsNr = DoorsNr;
  CarType = CarType;
  GearboxType = GearboxType;



  constructor(private authService: AuthService,
               private cookieService: CookieService, 
               private carsService: CarsService,
               private modalService: NgbModal,
               private customerService: CustomerService,
               private profileService: ProfileService,
               private errorService: ErrorService,
               private router: Router,
               private utilityService: UtilityService){}

    ngOnInit() {

      this.customerService.customer$.subscribe((value) => {
        console.log(value);
        if(value != null){
          this.customer = value;
          console.log(this.customer, 'home component');
        }
       
      });

      this.authService.isLoggedIn().subscribe((isLoggedIn) => {
        this.loggedIn = isLoggedIn;
      });

      

      
  
      this.carsService.getCars().subscribe((data: any) => {
        
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const car: Car = data[key];
            this.cars.push(car);
           
            
          }
        }
        console.log(this.cars);
  
      
      });

      
  
    }

   
    
    logOff(){
      this.authService.logOff()
    }

    getUser(){
        const user: LoggedUser = JSON.parse(this.cookieService.get('user'));
        console.log(user);
    }

    openResModal(car: Car){
      if(this.customer != null){
        const modalRef = this.modalService.open(AddReservationsModalComponent, { size: 'lg' });
        modalRef.componentInstance.car = car;
        modalRef.componentInstance.clientId = this.customer.id;
      } else {
        this.errorService.openErrorModal("you neeed a customer account to make reservations");
      }
        
    }
 }

  


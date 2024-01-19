import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedUser } from '../models/loggedUser';
import { CookieService } from 'ngx-cookie-service';
import { CarsService } from '../services/cars.service';
import { Car } from '../models/BL/car.model';
import { Company } from '../models/BL/company.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReservationsModalComponent } from '../addReservation/addRes-modal.component';
import { Customer } from '../models/BL/customer.model';
import { CustomerService } from '../services/customer.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
 
  
})



export class HomeComponent implements OnInit{
    
  
  loggedIn = false;
  
  cars: Car[] = [];

  customer: Customer | null = null;


  constructor(private authService: AuthService,
               private cookieService: CookieService, 
               private carsService: CarsService,
               private modalService: NgbModal,
               private customerService: CustomerService,
               private profileService: ProfileService){}

    ngOnInit(): void {

      
        
    

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
        const modalRef = this.modalService.open(AddReservationsModalComponent, { size: 'lg' });
        modalRef.componentInstance.car = car;
    }

    getCustomer(): void{
      this.customerService.getProfile();
       
    }


  }

  


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

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
 
  
})



export class HomeComponent implements OnInit{
    
  
  loggedIn = false;
  
  cars: Car[] = [];

  customer!: Customer;


  constructor(private authService: AuthService,
               private cookieService: CookieService, 
               private carsService: CarsService,
               private modalService: NgbModal,
               private customerService: CustomerService,
               private profileService: ProfileService){

                /*this.customer = this.customerService.getCustomer();
                console.log(this.customer);*/
               }

    ngOnInit() {

      this.customerService.customer$.subscribe((value) => {
        this.customer = value;
        console.log(this.customer, 'home component');
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
      
      //this.customer = await firstValueFrom(this.customerService.getProfile());
      
      //console.log(this.customer);
  
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
        modalRef.componentInstance.clientId = this.customer.id;
    }

    getCustomer(): void{
      this.customerService.getProfile();
       
    }


  }

  


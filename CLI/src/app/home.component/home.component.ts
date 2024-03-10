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
import { CompanyService } from '../services/company.service';
import { Photo } from '../models/BL/photo.model';



@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 
  
})



export class HomeComponent implements OnInit{
    
  isLoading = true;

  showModal = false; 
  selectedCar: Car | null = null;

  loggedIn = false;
  
  cars: Car[] = [];
  filteredCars: Car[] = [];

  displayedCars : Car[] = [];

  customer!: Customer;

  Engine = Engine;
  DorsNr = DoorsNr;
  CarType = CarType;
  GearboxType = GearboxType;

  company!: Company;

  years: number[] = [];

  searchQuery:string = '';

  yearFilter: string = '';
  doorsFilter: number = 0;
  engineFilter: number = 0;
  gearFilter: number = 0;
  typeFilter: number = 0;




  constructor(private authService: AuthService,
               private cookieService: CookieService, 
               private carsService: CarsService,
               private modalService: NgbModal,
               private customerService: CustomerService,
               private profileService: ProfileService,
               private errorService: ErrorService,
               private router: Router,
               private utilityService: UtilityService
              ){}

    ngOnInit() {

      this.years = this.generateYears();

      this.authService.isLoggedIn().subscribe((isLoggedIn) => {
        this.loggedIn = isLoggedIn;
      });

      

      
  
      this.carsService.getCars().subscribe((data: any) => {
        
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const car: Car = data[key];

            car.photos.forEach((photo: Photo) => {
              photo.photo = 'data:image/png;base64,'+photo.photo;
            });

            this.cars.push(car);
            this.filteredCars.push(car);
            this.isLoading = false;
           
            
          }
        }
        console.log(this.cars);
  
      
      });


      this.customerService.customer$.subscribe((value) => {
        console.log(value);
        if(value != null){
          this.customer = value;
          console.log(this.customer, 'home component');
        }
       
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
        this.errorService.openErrorModal("you neeed a customer account with a complete profile to make reservations");
      }
        
    }

    private generateYears(): number[] {
      const currentYear = new Date().getFullYear();
      const pastYears = 15;
      const years = [];
      for (let i = 0; i <= pastYears; i++) {
        years.push(currentYear - i);
      }
      return years;
    }

    engineEnum = Engine;
    gearboxEnum = GearboxType;
    doorsNrEnum = DoorsNr;
    carTypeEnum = CarType;

    getEngineOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.engineEnum);
    }
  
    getGearboxTypeOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.gearboxEnum);
    }

    getDoorsOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.doorsNrEnum);
    }

    getCarTypeOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.carTypeEnum);
    }

    identify(index: number, item: any) {
      return item.label;
    }

    filter(){
      this.filteredCars = this.cars;
      
        if (this.searchQuery !== '') {
            this.filteredCars = this.filteredCars.filter(car =>
                car.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                car.model.toLowerCase().includes(this.searchQuery.toLowerCase()) || (car.name + car.model).toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            }

  
    if (this.yearFilter !== '') {
        this.filteredCars = this.filteredCars.filter(car => car.year == parseFloat(this.yearFilter));
      }

    if (this.doorsFilter > 0) {
      console.log("dor filter", this.doorsFilter)
        this.filteredCars = this.filteredCars.filter(car => car.doorsNr == this.doorsFilter);
      }

      if (this.engineFilter > 0) {
        console.log('engin filter', this.engineFilter)
                 this.filteredCars = this.filteredCars.filter(car => car.engine == this.engineFilter);
      }

      if (this.gearFilter > 0) {
        console.log('gear filter', this.gearFilter)
            this.filteredCars = this.filteredCars.filter(car => car.gearboxType == this.gearFilter);
      }

      if (this.typeFilter > 0) {
            this.filteredCars = this.filteredCars.filter(car => car.type == this.typeFilter);
      }

      //console.log(filteredCars);
      return this.filteredCars;
    }

    resetFilters(){
      this.searchQuery = '';

      this.yearFilter = '';
      this.doorsFilter = 0;
      this.engineFilter = 0;
      this.gearFilter = 0;
      this.typeFilter = 0;
    
      this.filteredCars = this.cars;
    }

    selectCar(car: Car){
      this.selectedCar = car;
    }
    

  
 }

  


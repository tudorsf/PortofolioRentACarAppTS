import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedUser } from '../models/loggedUser';
import { CookieService } from 'ngx-cookie-service';
import { CarsService } from '../services/cars.service';
import { Car } from '../models/BL/car.model';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  
})



export class HomeComponent {
  
  loggedIn = false;
  
  cars: Car[] = [];


  constructor(private authService: AuthService, private cookieService: CookieService, private carsService: CarsService){
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });

    this.carsService.getCars().subscribe((data: any) => {
      
      //console.log(typeof(data));
      console.log(data[0]);
      console.log(data[1]);
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


  }

  


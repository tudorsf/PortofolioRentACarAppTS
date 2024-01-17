import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/BL/car.model';
import { Reservation } from '../models/BL/reservation.model';

@Injectable({
    providedIn: 'root'
  })

export class CarsService {
    constructor(private http: HttpClient) {}
    
    getCars() {
        return this.http.get('https://localhost:7262/api/Customer/GetCars?include=reservations');
    }

    addCar(car: Car){
        return this.http.post('https://localhost:7262/api/Company/addCar', car)
    }

    addReservation(reservation: Reservation){
        return this.http.post('https://localhost:7262/api/Customer/addReservation', reservation)
    }
    
}
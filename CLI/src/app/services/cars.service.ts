import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class CarsService {
    constructor(private http: HttpClient) {}
    
    getCars() {
        return this.http.get('https://localhost:7262/api/Customer/GetCars?include=reservations');
    }
    
}
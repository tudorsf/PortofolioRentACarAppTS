import { Component, Input, ViewEncapsulation } from "@angular/core";
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from "src/app/models/BL/reservation.model";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { Car } from "../models/BL/car.model";
import { CarsService } from "../services/cars.service";

@Component({
    selector: 'app-addRes-modal',
    templateUrl: './addRes-modal.component.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
        MatNativeDateModule,
      ],
      encapsulation: ViewEncapsulation.None, // Add this line
      styleUrls: ['./addRes-modal.component.css']
  })


export class AddReservationsModalComponent {
    @Input() car!: Car;

    private modalRef: NgbModalRef | null = null;

    constructor(public activeModal: NgbActiveModal, private carsService: CarsService){}

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      });
    
    save(){

      const startDate: Date | null | undefined = this.range.get('start')?.value;
      const endDate: Date | null | undefined = this.range.get('end')?.value;
      console.log('startDate', startDate);

      const utcStartDate = new Date(startDate!.toISOString());
      const utcEndDate = new Date(endDate!.toISOString());

      console.log('utcdate:', utcStartDate);

      if (startDate && endDate) {
      
        const reservation: Reservation = {
          id: 0, 
          carId: this.car.id, 
          companyId: this.car.companyREF,
          customerId: 1, 
          startDate: utcStartDate,
          endDate: utcEndDate,
          
          totalPrice: 0 
        };
  
       
        console.log(reservation);
        console.log(this.car);

        /*this.carsService.addReservation(reservation).subscribe(
          success => this.activeModal.dismiss()
        )*/
      } else {
        
        console.log('Please select both start and end dates.');
      }
    }
}



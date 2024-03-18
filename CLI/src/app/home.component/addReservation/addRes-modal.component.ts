import { Component, Input, ViewEncapsulation,OnInit, OnDestroy, EventEmitter, Output } from "@angular/core";
import { NgbModalRef, NgbActiveModal, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from "src/app/models/BL/reservation.model";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { Car } from "../../models/BL/car.model";
import { CarsService } from "../../services/cars.service";
import { Customer } from "../../models/BL/customer.model";
import { CustomerService } from "../../services/customer.service";
import { ProfileService } from "../../services/profile.service";
import { ErrorModalComponent } from "src/app/shared/error-modal/error-modal.component";
import { ErrorService } from "src/app/services/error.service";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {NativeDateAdapter} from '@angular/material/core';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { utc } from "moment";
import { CommonModule } from '@angular/common';

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
        MatButtonModule,
        MatInputModule,
        NgbTimepickerModule,
        CommonModule,
      ],
      encapsulation: ViewEncapsulation.None, 
      styleUrls: ['./addRes-modal.component.css'],
      providers: [NativeDateAdapter],
  })


export class AddReservationsModalComponent implements OnInit, OnDestroy{
    @Input() car!: Car;

    @Input() clientId!: number;


    btnDisabled = true;

    range!: FormGroup;
    
    todayDate = new Date();


    pickUptime: NgbTimeStruct = { hour: this.todayDate.getHours() , minute: this.todayDate.getMinutes(), second: 30 };

    dropOfftime: NgbTimeStruct = { hour: this.todayDate.getHours(), minute: 30, second: 30 };

    
    totalPrice: number = 0;



    private modalRef: NgbModalRef | null = null;

   

    constructor(public activeModal: NgbActiveModal,
                 private customerService: CustomerService, 
                 private carsService: CarsService,
                 private errorService: ErrorService,
                 private fb: FormBuilder,
                 private config: NgbTimepickerConfig){

                  config.seconds = false;
                  config.spinners = false;

                  this.range = this.fb.group({
                    start: [null, Validators.required],
                    end: [null, Validators.required]
                  });

                  
                }

      ngOnInit(){

      }

      ngOnDestroy(): void {
        this.carsService.getCars();
      }

      calculateTotalPrice(){
        const startDate: Date | null | undefined = this.range.get('start')?.value;
        const endDate: Date | null | undefined = this.range.get('end')?.value;

        const utcStartDate = new Date(startDate!.toISOString());
        const utcEndDate = new Date(endDate!.toISOString());

         return Math.floor(((utcEndDate.getTime() - utcStartDate.getTime()) / 1000 / 60 / 60 / 24) + 1) * this.car.pricePerDay;
        
      }

      

    
    save(){
      
      const startDate: Date | null | undefined = this.range.get('start')?.value;
      const endDate: Date | null | undefined = this.range.get('end')?.value;
     
      const utcStartDate = new Date(startDate!.toISOString());
      utcStartDate.setHours(this.pickUptime.hour);
      utcStartDate.setMinutes(this.pickUptime.minute);

      
      const utcEndDate = new Date(endDate!.toISOString());
      utcEndDate.setHours(this.dropOfftime.hour);
      utcEndDate.setMinutes(this.dropOfftime.minute);

      if (startDate && endDate) {
      
        const reservation: Reservation = {
          id: 0, 
          carId: this.car.id, 
          companyId: this.car.companyREF,
          customerId: this.clientId,
          startDate: utcStartDate,
          endDate: utcEndDate,
          compRating: null,
          custRating: null,
          totalPrice: 0 
        };
  
        this.carsService.addReservation(reservation).subscribe(

            success => {
              this.car.reservations.push(reservation)
              this.activeModal.dismiss();
              this.errorService.openSuccessModal("Reservation added");
            },
            error => {
              this.errorService.openErrorModal(error.error)
            }
            
           
          )
        
        
      } else {
        
        
        console.log('Please select both start and end dates.');
      }
    }

    getCustomerId(){
      let customer: any = this.customerService.getProfile();
      if(customer)
        return customer.id;
    }

    notAvailable = (d: Date | null): boolean => {
      
       if (this.car && this.car.reservations) {
        const reservations = this.car.reservations;
        const selectedDate = d || new Date(); 
  
      
          for (const reservation of reservations) {
            const startDate = new Date(reservation.startDate);
            startDate.setHours(0);
            startDate.setMinutes(0);
            const endDate = new Date(reservation.endDate);
            endDate.setHours(0);
            endDate.setMinutes(0);
            if (selectedDate >= startDate && selectedDate <= endDate) {
               return false; 
            }
           
          }
      } 
  
      return true;
    };

    isTimeInPast(time: NgbTimeStruct): boolean{
      const now = new Date();
      const selectedTime = new Date();
     
      const startDate: Date | null | undefined = this.range.get('start')?.value;

      if(startDate){
        const utcStartDate = new Date(startDate!.toISOString());
        if(utcStartDate.getDay() == now.getDay()){
          selectedTime.setHours(time.hour - 2);
          selectedTime.setMinutes(time.minute);
          return selectedTime < now;
        }
      }

      return false;
    }

    overlap(){
    
      if (this.car && this.car.reservations) {
        const newReservationStartDate = new Date(this.range.get('start')?.value);
        const newReservationEndDate = new Date(this.range.get('end')?.value);
    
        for (const reservation of this.car.reservations) {
          const existingReservationStartDate = new Date(reservation.startDate);
          const existingReservationEndDate = new Date(reservation.endDate);
    
          if (newReservationStartDate < existingReservationEndDate && newReservationEndDate > existingReservationStartDate) {
            return true; // Overlap found
          }
        }
      }
      return false; // No overlap found

    }

    isDropOffTimeValid(): boolean {
      const selectedStartDate = new Date(this.range.get('start')?.value);
      const selectedEndDate = new Date(this.range.get('end')?.value);
  
      if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
        const pickUpDateTime = new Date(selectedStartDate);
        pickUpDateTime.setHours(this.pickUptime.hour, this.pickUptime.minute);
        const dropOffDateTime = new Date(selectedStartDate);
        dropOffDateTime.setHours(this.dropOfftime.hour, this.dropOfftime.minute);
        
        return dropOffDateTime < pickUpDateTime;
      } else {
          return false;
      }
    }


    hoursDifference(): boolean{
      
        const selectedStartDate = new Date(this.range.get('start')?.value);
        const selectedEndDate = new Date(this.range.get('end')?.value);
      
        const daysDifference = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 3600 * 24));
      
        if (selectedStartDate.getTime() === selectedEndDate.getTime()) {

          const pickUpDateTime = new Date(selectedStartDate);
          pickUpDateTime.setHours(this.pickUptime.hour, this.pickUptime.minute);
          const dropOffDateTime = new Date(selectedStartDate);
          dropOffDateTime.setHours(this.dropOfftime.hour, this.dropOfftime.minute);
          const timeDifferenceMillis = dropOffDateTime.getTime() - pickUpDateTime.getTime();
          const timeDifferenceHours = timeDifferenceMillis / (1000 * 60 * 60);
            if(timeDifferenceHours < 10){
              return true;
            }
             
          } 
      
        if (daysDifference == 1) {
          const pickUpDateTime = new Date(selectedStartDate);
          pickUpDateTime.setHours(this.pickUptime.hour, this.pickUptime.minute);
          const dropOffDateTime = new Date(selectedEndDate);
          dropOffDateTime.setHours(this.dropOfftime.hour, this.dropOfftime.minute);
          const timeDifferenceMillis = dropOffDateTime.getTime() - pickUpDateTime.getTime();
          const timeDifferenceHours = timeDifferenceMillis / 1000 / 60 / 60;

          if(timeDifferenceHours < 20){
            return true;
          }
        }
      
        return false;

    }

}

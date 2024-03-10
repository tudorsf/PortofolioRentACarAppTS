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

    /*@Output() reservationAdded: EventEmitter<void> = new EventEmitter<void>();*/

    btnDisabled = true;

    range!: FormGroup;
    
    todayDate = new Date();

    pickUptime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };

    dropOfftime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };

    
    totalPrice: number = 0;



    private modalRef: NgbModalRef | null = null;

   

    constructor(public activeModal: NgbActiveModal,
                 private customerService: CustomerService, 
                 private carsService: CarsService,
                 private  errorService: ErrorService,
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

         return Math.floor((utcEndDate.getTime() - utcStartDate.getTime()) / 1000 / 60 / 60 / 24) * this.car.pricePerDay;
        
      }

      

    
    save(){
      
      const startDate: Date | null | undefined = this.range.get('start')?.value;
      const endDate: Date | null | undefined = this.range.get('end')?.value;
      console.log('startDate', startDate);

      console.log('startTime', this.pickUptime);
      console.log('dropoffTime', this.dropOfftime);



      const utcStartDate = new Date(startDate!.toISOString());
      utcStartDate.setHours(this.pickUptime.hour);
      utcStartDate.setMinutes(this.pickUptime.minute);

      
      const utcEndDate = new Date(endDate!.toISOString());
      utcEndDate.setHours(this.dropOfftime.hour);
      utcEndDate.setMinutes(this.dropOfftime.minute);

      console.log('utcdate:', utcStartDate);


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
  
       
        console.log(reservation);
        console.log(this.car);
        this.carsService.addReservation(reservation).subscribe(

            success => {
              //this.reservationAdded.emit();
              this.car.reservations.push(reservation)
              this.activeModal.dismiss();
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

    

   
    

    

   
}



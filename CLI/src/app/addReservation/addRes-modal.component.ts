import { Component, Input, ViewEncapsulation } from "@angular/core";
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from "src/app/models/BL/reservation.model";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

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
    //@Input() reservations!: Reservation[];

    private modalRef: NgbModalRef | null = null;

    reservation: Reservation | null = null;

    constructor(public activeModal: NgbActiveModal){}

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      });
    
    save(){
        /*console.log(this.range.value.start);
        this.reservation?.startDate = new Date(this.range.value.start);*/
        if (this.reservation) {
            const selectedStartDate: Date | null | undefined = this.range.value.start;
        
            // Check if a start date is selected
            if (selectedStartDate) {
              // Assign the selected start date to the reservation's startDate property
              this.reservation.startDate = new Date(selectedStartDate);
        
              // Log the updated reservation object
              console.log('Updated Reservation:', this.reservation);
            } else {
              console.error('No start date selected.');
            }
          }
    }
}



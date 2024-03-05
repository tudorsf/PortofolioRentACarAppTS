import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Car } from "src/app/models/BL/car.model";
import { Customer } from "src/app/models/BL/customer.model";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddReservationsModalComponent } from '../addReservation/addRes-modal.component';
import { ErrorService } from "src/app/services/error.service";



@Component({
    selector: 'carDetails-component',
    templateUrl: './carDetails.component.html',
    styleUrls: ['./carDetails.component.css']
   
    
    
  })

  export class CarDetails implements OnInit{
    
    @Input() car!: Car;

    @Input() clientId!: number;

    @Input() customer!: Customer;

    range!: FormGroup;

    todayDate = new Date();


    constructor( private modalService: NgbModal,
                  private errorService: ErrorService){

    }
    
    ngOnInit(): void {
        console.log(this.car);
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


    //@ViewChild('carousel', { static: true }) carousel!: NgbCarousel; 


    /*prevSlide(){
      if(this.carousel){
        this.carousel.prev();

      } else {
        console.log("?")
      }
    }

    nextSlide(){
      if(this.carousel){
        this.carousel.next();

      }
    }*/

   
  }
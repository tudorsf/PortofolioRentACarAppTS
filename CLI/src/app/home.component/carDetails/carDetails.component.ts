import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Car } from "src/app/models/BL/car.model";
import { Customer } from "src/app/models/BL/customer.model";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'carDetails-component',
    templateUrl: './carDetails.component.html',
    styleUrls: ['./carDetails.component.css']
   
    
  })

  export class CarDetails implements OnInit{
    
    @Input() car!: Car;

    @Input() clientId!: number;

    @Input() customer!: Customer;

    
    ngOnInit(): void {
        console.log(this.car);
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
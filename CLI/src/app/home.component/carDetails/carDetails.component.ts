import { Component, Input, OnInit } from "@angular/core";
import { Car } from "src/app/models/BL/car.model";
import { Customer } from "src/app/models/BL/customer.model";

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
        
    }

   
  }
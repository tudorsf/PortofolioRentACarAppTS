import { Component, Input, OnInit } from "@angular/core";
import { Car } from "src/app/models/BL/car.model";

@Component({
    selector: 'carDetails-component',
    templateUrl: './carDetails.component.html',
    styleUrls: ['./carDetails.component.css']
   
    
  })

  export class CarDetails implements OnInit{
    
    @Input() car!: Car;

    @Input() clientId!: number;


    ngOnInit(): void {
        
    }
  }
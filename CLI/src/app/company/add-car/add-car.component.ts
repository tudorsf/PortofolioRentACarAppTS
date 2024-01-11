import { Component, OnInit  } from '@angular/core';
import { Car } from 'src/app/models/BL/car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/BL/company.model';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';



@Component({
    selector: 'add-car',
    templateUrl: './add-car.component.html',
    styleUrls: ['./add-car.component.css']
  })


  export class AddCarComponent implements OnInit {

    carForm: FormGroup;

    car: Car = {
        id: 0,
        name: '',
        pricePerDay: 0,
        companyREF: 0,
        photos: [],
        reservations: []
    }

    company: Company | null = null;

    constructor(private fb: FormBuilder,
                private companyService: CompanyService,
                private carsService: CarsService,
                private router: Router,
                private errorService:  ErrorService
            ){
        this.carForm = this.fb.group({
            name: ['', Validators.required],
            pricePerDay: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.companyService.getProfile().subscribe(
            (data: any) => {
              console.log(data + "data from backend")
              if(data != null){
                try{
                  this.company = data;
                }
                catch (error) {
                  console.error('Error creating profile:', error);
                }
                console.log(this.company + " company from backend");
              }
             
            },
            (error: any) => {
              console.error('Error creating profile:', error);
            }
          );
    }

    addCar(){
        this.car =  this.carForm.value;
        if(this.company != null){
            this.car.companyREF = this.company?.id;
            console.log(this.car);
            this.carsService.addCar(this.car).subscribe(
                success => {
                   this.router.navigate(["/company"]);
                },

                error => {
                    this.errorService.openErrorModal(error.message);
                }
            );
           
        }
    }
  }

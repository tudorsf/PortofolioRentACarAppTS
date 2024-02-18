import { Component, OnInit  } from '@angular/core';
import { Car } from 'src/app/models/BL/car.model';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/BL/company.model';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { DoorsNr, Engine,CarType, GearboxType, } from 'src/app/models/enums/carEnums';
import { UtilityService } from 'src/app/services/utility.service';



@Component({
    selector: 'add-car',
    templateUrl: './add-car.component.html',
    styleUrls: ['./add-car.component.css']
  })


  export class AddCarComponent implements OnInit {

    carForm: FormGroup;

    car!: Car /*= {
        id: 0,
        name: '',
        brand: '',
        pricePerDay: 0,
        companyREF: 0,
        photos: [],
        reservations: [],
        doorsNr: 3,
        engine: 1,
        gearboxType: 1,
        carType: 1,
        year: 0,
        horsepower: 0
    }*/

   
    company: Company | null = null;

    constructor(private fb: FormBuilder,
                private companyService: CompanyService,
                private carsService: CarsService,
                private router: Router,
                private errorService:  ErrorService,
                private utilityService: UtilityService
            ){
        this.carForm = this.fb.group({
            name: ['', Validators.required],
            pricePerDay: ['', Validators.required],
            doorsNr: [''],
            engineCapacity: ['', Validators.required],
            brand: ['', Validators.required],
            engine: [''],
            gearboxType: [''],
           type: [''],
            year: [''],
            horsepower: [''],
            photos: this.fb.array([])

        })
    }

    ngOnInit(): void {

        this.companyService.company$.subscribe((value) => {
            this.company = value;
            console.log(this.company, 'home component');
          });
    }

    engineEnum = Engine;
    gearboxEnum = GearboxType;
    doorsNrEnum = DoorsNr;
    carTypeEnum = CarType;

    getEngineOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.engineEnum);
    }
  
    getGearboxTypeOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.gearboxEnum);
    }

    getDoorsOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.doorsNrEnum);
    }

    getCarTypeOptions(): { label: string, value: any }[] {
      return this.utilityService.getEnumOptions(this.carTypeEnum);
    }
    

    identify(index: number, item: any) {
      return item.label;
    }
  

    addCar(){
      //console.log()
      console.log(this.carForm.value , 'car form value');

        this.car =  this.carForm.value;
        console.log(this.car);
        
        this.car.type = +this.car.type;
        console.log(this.car.type)
        this.car.doorsNr = +this.car.doorsNr;
        this.car.engine = +this.car.engine;
        this.car.gearboxType = +this.car.gearboxType;
        this.car.year = +this.car.year;

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
           
        } else {
          console.log("company null")
        }
    }

    uploadPicture(event: any){
      const files: FileList = event.target.files;
      const photosArray = this.carForm.get('photos') as FormArray;

      for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
          const reader = new FileReader();

          reader.onload = (e) => {
              const base64Image: string = reader.result as string;

              const base64String = base64Image.split(',')[1];

              photosArray.push(this.fb.control(base64String)); 
          };

          reader.readAsDataURL(file); 
      }
    }
  }

import { Component, HostBinding, OnInit  } from '@angular/core';
import { Car } from 'src/app/models/BL/car.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/BL/company.model';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { DoorsNr, Engine,CarType, GearboxType, } from 'src/app/models/enums/carEnums';
import { UtilityService } from 'src/app/services/utility.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';




@Component({
    selector: 'add-car',
    templateUrl: './add-car.component.html',
    styleUrls: ['./add-car.component.css']
  })


  export class AddCarComponent implements OnInit {

    carForm: FormGroup;

    photosArray!: FormArray;

    previewPhotos: any[] = [];

    URL: (string | ArrayBuffer)[] | null = null;

    car!: Car;

    company: Company | null = null;

    info: boolean = false;

    

    constructor(private fb: FormBuilder,
                private companyService: CompanyService,
                private carsService: CarsService,
                private router: Router,
                private errorService:  ErrorService,
                private utilityService: UtilityService
            ){
        this.carForm = this.fb.group({
            name: ['', Validators.required],
            pricePerDay: ['', this.priceHpwValidator()],
            doorsNr: ['', this.dropDownValidator()],
            engineCapacity: ['', [Validators.required, this.engineCapacityValidator()]],
            model: ['', Validators.required],
            engine: ['',this.dropDownValidator()],
            gearboxType: ['', this.dropDownValidator()],
            type: ['', this.dropDownValidator()],
            year: ['', this.yearValidator()],
            horsepower: ['', this.priceHpwValidator()],
            photos: this.fb.array([])

        })
    }

    ngOnInit(): void {

        this.companyService.company$.subscribe((value) => {
            this.company = value;
            console.log(this.company, 'home component');
          });
          
          this.photosArray = this.carForm.get('photos') as FormArray;

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
                  this.errorService.openSuccessModal(this.car.name + ' ' + this.car.model + ' successfully added')
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
      this.photosArray = this.carForm.get('photos') as FormArray;

      for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
          const reader = new FileReader();

          reader.onload = (e) => {
              const base64Image: string = reader.result as string;

              //const base64String = base64Image.split(',')[1];

              this.photosArray.push(this.fb.control(base64Image)); 
             
          };

          reader.readAsDataURL(file); 
      }

    }


    onDrop(event: CdkDragDrop<string[]>) {
     
      moveItemInArray(this.carForm.get('photos')!.value, event.previousIndex, event.currentIndex);
    }

    removePic(photo: string) {
      const photosArray = this.carForm.get('photos') as FormArray;
      const photoIndex = photosArray.value.indexOf(photo);
      
      if (photoIndex !== -1) {
        photosArray.removeAt(photoIndex);
      }
    }

    askInfo(){
      this.info = !this.info;
    }

    engineCapacityValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = parseFloat(control.value);
    
        if (isNaN(value)) {
          return { 'invalidNumber': true };
        }
    
        if (value < 0.8 || value > 5.0) {
          return { 'range': true };
        }
    
        return null; 
      };
    }

    dropDownValidator(): ValidatorFn{
      return (control: AbstractControl): ValidationErrors | null => {
        const selectedValue = control.value;
        if (!selectedValue) {
          return { 'required': true };
        }
        return null; // No error, validation passed
      };
    }

    yearValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const currentYear = new Date().getFullYear();
        
        const yearPattern = /^\d{4}$/;
    
        if (!yearPattern.test(value)) {
          return { 'invalidYearFormat': true }; 
        }
    
        const inputYear = parseInt(value, 10);
        if (isNaN(inputYear) || inputYear < currentYear - 15 || inputYear > currentYear) {
          return { 'yearRange': true }; 
        }
    
        return null; 
      };
    }

    isInvalid(controlName: string) {
      const control = this.carForm.get(controlName);
      return control && control.invalid && (control.dirty || control.touched);
    }

    priceHpwValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = parseFloat(control.value);
    
        if (isNaN(value)) {
          return { 'invalidNumber': true };
        }
    
        if (value < 1) {
          return { 'range': true };
        }
    
        return null; 
      };
    }

    

    
    

  }

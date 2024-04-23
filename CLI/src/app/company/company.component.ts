import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Company } from '../models/BL/company.model';
import { CompanyService } from '../services/company.service';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs';
import { StreetMapService } from '../services/streetMap.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/BL/reservation.model';
import { Car } from '../models/BL/car.model';
import { ReservationsModalComponent } from './reservations-modal/reservations-modal.component';
import { Engine,DoorsNr, GearboxType,CarType } from '../models/enums/carEnums';
import { UtilityService } from '../services/utility.service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SignalRService } from '../services/signalR.service';
import { ErrorService } from '../services/error.service';





@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css',
'../app.component.css']
})

export class CompanyComponent implements OnInit, AfterViewInit {

  private modalRef: NgbModalRef | null = null;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  company: Company | null = null;

  address: string = '';

  reservations: Reservation[] = [];
  
  cars: Car[] = [];

  Engine = Engine;
  DorsNr = DoorsNr;
  CarType = CarType;
  GearboxType = GearboxType;

  isLoading: boolean = true;

  showDropdown = false;

  dataSource = new MatTableDataSource<Car>();

  displayedColumns:any = ['name', 'model', 'pricePerDay', 'engine', 'doorsNr', "type", "gearboxType", "reservations"];

  notifications: string[] = [];

  message: string = ''

 constructor(private companyService: CompanyService, 
             private modalService: NgbModal, 
             private profileService: ProfileService,
             private streetService: StreetMapService,
             private router: Router,
             private utilityService: UtilityService,
            private signalRService: SignalRService,
          private errorService: ErrorService) 
          {}

  ngOnInit(): void {


    this.companyService.getProfile().subscribe(
      (data: any) => {
        if(data != null){
          try{
            this.company = data;
            this.company!.cars.forEach((car) => {
                   this.reservations = [ ...car.reservations];

            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<Car>(this.company?.cars);

            if(this.dataSource){
              this.dataSource.paginator = this.paginator;
            }
           
         
           
          }
          catch (error) {
            console.error('Error creating profile:', error);
          }
        } else if(data == null){
          this.isLoading = false;
        }
       
      },
      (error: any) => {
        console.error('Error creating profile:', error);
        this.isLoading = false;
      }
    ) 

    this.companyService.company$.subscribe((value) => {
      this.company = value;
      console.log(this.company, 'home component');
      
    });
    
     console.log(this.notifications);

    this.signalRService.getNotificationReceivedObservable().subscribe((notification: string) => {
              this.notifications.push(notification);
              console.log(this.notifications, 'notif');
              this.errorService.openErrorModal(notification);
            });

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

 
  


  openCarModal(){
    console.log("");
  }

  
  navigate(){
    this.router.navigate(['/add-car']);
  }

  

  toggleDropdown(car: any): void {
    this.showDropdown = !this.showDropdown;
  }

  openReservationModal(carReservations: Reservation[]): void {
    const modalRef = this.modalService.open(ReservationsModalComponent, { size: 'xl', windowClass:'resModal'});
    modalRef.componentInstance.reservations = carReservations;
  }

  
  
  

}

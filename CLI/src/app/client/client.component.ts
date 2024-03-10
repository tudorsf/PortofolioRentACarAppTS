import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/BL/customer.model';
import { CustomerService } from '../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { NoProfileComponent } from '../noProfile.component/noProfile.component';
import { Reservation } from '../models/BL/reservation.model';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  isLoading = true;
  customer: Customer | null = null;
  reservations: Reservation[] = [];
  selectedOption: string = 'future';
  rated = false;
  rating!: number;
  show = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  hoveredRating: number = 0;
  selectedReservationId: number | null = null;


  constructor(private customerService: CustomerService, 
              private modalService: NgbModal, 
              private profileService: ProfileService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit(): void {

    /*this.customerService.customer$.subscribe((value) => {
      this.customer = value;
      this.isLoading = false;
      console.log(this.customer, 'home component');
    });*/

    this.customerService.getProfile().subscribe(
      (data: any) => {
        console.log(data + "data from backend")
        if(data != null){
          try{
            this.customer = data;
            this.customerService.setCustomer(this.customer);
            this.isLoading = false;
            this.reservations  = Object.assign([], this.customer?.reservations);
            this.reservations.forEach(res => {
              res.custRating == null ? this.rated = false : this.rated = true;
              console.log(this.rated);
            })
            console.log(this.reservations);
          }
          catch (error) {
            console.error('Error creating profile:', error);
          }
          console.log(this.customer + " company from backend");
        } else if(data == null){
          this.isLoading = false;
        }
       
      },
      (error: any) => {
        console.error('Error creating profile:', error);
      }
    );



    
    if(!this.customer){
      this.profileService.data$.subscribe((data) => {
        if(data != null){
          this.customer = data;
          //this.closeModal();
         }
      });
    }

  }

  get filteredReservations() {
    //this.filteredReservations = this.reservations;

    const currentDate = new Date();
    if (this.selectedOption == 'past') {
     
      return this.reservations.filter(reservation => new Date(reservation.endDate).setHours(0) < currentDate.setHours(0));
    } else if (this.selectedOption == 'current') {
      console.log('curr')

      return this.reservations.filter(reservation =>
        new Date(reservation.startDate).setHours(0,0,0,0) == new Date().setHours(0,0,0,0))
      
    } else if (this.selectedOption == 'future') {
      return this.reservations.filter(reservation => new Date(reservation.startDate).setHours(0) > currentDate.setHours(0))
    }
    return this.reservations;
  }

  rate(reservationId: number, stars: number){
    //reservation.showRating = false;
    console.log('reservation id', reservationId, 'and rating', stars)
    this.customerService.rateCompany(reservationId, stars).subscribe(
      success => {
        const reservation = this.reservations.find(x => x.id === reservationId);
        if(reservation){
          
          reservation.custRating = stars;
          this.toggleRating(reservation.id);
        }
        console.log(reservation);
       this.errorService.openErrorModal("rated successfully")
      },
      error => {
        this.errorService.openErrorModal("something went wrong")
      }
    
    );
  }

  showStars(){
    this.show = !this.show ;
  }

  onMouseEnter(star: number) {
    this.hoveredRating = star;
  }

  onMouseLeave() {
    this.hoveredRating = 0;
  }

  toggleRating(reservationId: number) {
    if (this.selectedReservationId === reservationId) {
      this.selectedReservationId = null; // Hide rating if clicked again
    } else {
      this.selectedReservationId = reservationId; // Show rating for clicked reservation
    }
  }
  
  






}

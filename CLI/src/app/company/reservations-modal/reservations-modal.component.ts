import { Component, Input } from "@angular/core";
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from "src/app/models/BL/reservation.model";
import { CompanyService } from "src/app/services/company.service";
import { ErrorService } from "src/app/services/error.service";

@Component({
    selector: 'app-reservations-modal',
    templateUrl: './reservations-modal.component.html',
    styleUrls: ['./reservations-modal.component.css']
  })


export class ReservationsModalComponent {
    @Input() reservations!: Reservation[];
    selectedOption: string = 'future';
  rated = false;
  rating!: number;
  show = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  hoveredRating: number = 0;
  selectedReservationId: number | null = null;

    private modalRef: NgbModalRef | null = null;


    constructor(public activeModal: NgbActiveModal,
                private companyService: CompanyService,
                private errorService: ErrorService){}

    get filteredReservations() {
      //this.filteredReservations = this.reservations;
  
      const currentDate = new Date();
      if (this.selectedOption == 'past') {
       
        return this.reservations.filter(reservation => new Date(reservation.endDate).setHours(0) < currentDate.setHours(0));
      } else if (this.selectedOption == 'current') {
  
        return this.reservations.filter(reservation =>
          new Date(reservation.startDate).setHours(0,0,0,0) <= new Date().setHours(0,0,0,0) && new Date().setHours(0,0,0,0) <= new Date(reservation.endDate).setHours(0,0,0,0))
        
      } else if (this.selectedOption == 'future') {
        return this.reservations.filter(reservation => new Date(reservation.startDate).setHours(0) > currentDate.setHours(0))
      }
      return this.reservations;
    }
  
    rate(reservationId: number, stars: number){
      //reservation.showRating = false;
      console.log('reservation id', reservationId, 'and rating', stars)
      this.companyService.rateCustomer(reservationId, stars).subscribe(
        success => {
          const reservation = this.reservations.find(x => x.id === reservationId);
          if(reservation){
            
            reservation.compRating = stars;
            this.toggleRating(reservation.id);
          }
          console.log(reservation);
         this.errorService.openInfoModal("rated successfully")
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
        this.selectedReservationId = null; 
      } else {
        this.selectedReservationId = reservationId; 
      }
    }
}

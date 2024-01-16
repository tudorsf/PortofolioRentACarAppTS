import { Component, Input } from "@angular/core";
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from "src/app/models/BL/reservation.model";

@Component({
    selector: 'app-reservations-modal',
    templateUrl: './reservations-modal.component.html'
    
  })


export class ReservationsModalComponent {
    @Input() reservations!: Reservation[];

    private modalRef: NgbModalRef | null = null;

   
    //reservations: Reservation[] = []

    constructor(public activeModal: NgbActiveModal){}
}

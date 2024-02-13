import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal, private router: Router) {}

  openErrorModal(errorMessage: string): void {
    this.modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
    this.modalRef.componentInstance.errorMessage = errorMessage;
  }

  closeErrorModal(): void {
     /*if(this.modalRef!.componentInstance.errorMessage == "you neeed a customer account to make reservations"){
      
      this.modalRef!.close('Manually closed');
      this.modalRef = null; 
      this.router.navigate(['/register']);
      
    } else */if (this.modalRef) {
      console.log(this.modalRef!.componentInstance.errorMessage);
      this.modalRef.close('Manually closed');
      this.modalRef = null; 

    }


  }

}

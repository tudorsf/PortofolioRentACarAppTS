import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  openErrorModal(errorMessage: string): void {
    this.modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
    this.modalRef.componentInstance.errorMessage = errorMessage;
  }

  closeErrorModal(): void {
    if (this.modalRef) {
      this.modalRef.close('Manually closed');
      this.modalRef = null; // Reset the modalRef after closing
    }
  }

  /*openErrorModal(errorMessage: string): void {
    const modalRef = this.modalService.open(ErrorModalComponent, {centered: true});
    console.log(modalRef);
    modalRef.componentInstance.errorMessage = errorMessage;
  }

  closeErrorModal(modalRef): void {
    if (this.modalRef) {
      this.modalRef.close('Manually closed');
    }
  }*/
}

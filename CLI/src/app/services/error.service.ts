import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private modalService: NgbModal) {}

  openErrorModal(errorMessage: string): void {
    const modalRef = this.modalService.open(ErrorModalComponent);
    console.log(modalRef);
    modalRef.componentInstance.errorMessage = errorMessage;
  }
}

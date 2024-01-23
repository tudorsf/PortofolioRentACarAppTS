import { Component, Input, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from "src/app/models/BL/customer.model";
import { Reservation } from "src/app/models/BL/reservation.model";
import { AuthService } from "src/app/services/auth.service";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from "src/app/services/customer.service";


@Component({
    selector: 'cliProfile-modal',
    templateUrl: './cliProfile-modal.component.html',
    standalone: true,
    imports: [
        // Other modules here
        ReactiveFormsModule,
      ],
  })

  

export class CliProfileModalComponent {
    //@Input() reservations!: Reservation[];

    private modalRef: NgbModalRef | null = null;

    customer!: Customer;

    customerForm: FormGroup;
    
    constructor(public activeModal: NgbActiveModal, 
                private fb: FormBuilder,
                private authService: AuthService,
                private customerService: CustomerService){
        this.customerForm = this.fb.group({
            name: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            eMail: ['', [Validators.required, Validators.email]]
        });
    }


    createProfile(){
        this.customer =  this.customerForm.value;
        this.customer.userREF = this.authService.getUserREF();
        console.log(this.customer);
        this.customerService.createProfile(this.customer).subscribe(
            success => this.activeModal.dismiss()
            
        )
    }

   
}

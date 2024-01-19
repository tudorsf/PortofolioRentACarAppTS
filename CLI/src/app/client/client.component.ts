import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/BL/customer.model';
import { CustomerService } from '../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  customer: Customer | null = null;


  constructor(private customerService: CustomerService, 
              private modalService: NgbModal, 
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit(): void {
    this.customerService.getProfile().subscribe(
      (data: any) => {
        console.log(data + "data from backend")
        if(data != null){
          try{
            this.customer = data;
            this.customerService.setCustomer(this.customer);
            console.log(this.customer)
          }
          catch (error) {
            console.error('Error creating profile:', error);
          }
          console.log(this.customer + " company from backend");
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

}

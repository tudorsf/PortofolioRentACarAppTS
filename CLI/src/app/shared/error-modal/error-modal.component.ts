import { Component } from "@angular/core";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from "src/app/services/error.service";

@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'error-modal',
    templateUrl: './error-modal.component.html',
    
  })

  export class ErrorModalComponent {
    errorMessage = '';

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.currentErrorMessage.subscribe(message => this.errorMessage = message);
  }
  }
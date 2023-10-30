import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessageSource = new BehaviorSubject<string>('');
  currentErrorMessage = this.errorMessageSource.asObservable();

  constructor() { }

  changeErrorMessage(message: string) {
    this.errorMessageSource.next(message);
  }
}

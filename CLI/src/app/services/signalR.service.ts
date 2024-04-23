import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private notificationReceived = new Subject<string>();
 

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7262/hub') 
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR Connected');
      this.registerNotifications();
    }).catch(err => console.error('SignalR Connection Error: ', err));
  }

  private registerNotifications() {
    this.hubConnection.on('SendNotification', (message: string) => {
      this.notificationReceived.next(message);
    });
  }

  getNotificationReceivedObservable() {
    console.log(this.notificationReceived.asObservable());
    return this.notificationReceived.asObservable();
    
  }

 
}

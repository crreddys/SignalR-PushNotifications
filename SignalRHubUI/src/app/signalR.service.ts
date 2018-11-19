import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Message } from './message.model';

@Injectable()
export class SignalRService {
  messageReceived = new Subject<Message>();
  connectionEstablished = new Subject<Boolean>();

  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection(): void {
    // as per setup in the startup.cs
    this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/notify').build();
  }

  private startConnection(): void {
    // starting the connection
      setTimeout(() => {
      this.hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      });
    }, 5000);
  }

  private registerOnServerEvents(): void {
    // message coming from the server
    this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      console.log(type);
      console.log(payload);
      console.log('Message Received: ' + payload);
      this.messageReceived.next({ type : type, payload: payload});
    });
  }
}

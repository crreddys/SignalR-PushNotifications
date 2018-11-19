import { Component } from '@angular/core';
import { Message } from './message.model';
import { SignalRService } from './signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SignalRHubUI';
  public messages: string[] = [];
  public message: string;
  canSendMessage: boolean;

  constructor(private signalRService: SignalRService) {
    this.subscribeToEvents();
  }

  send() {
    // message sent from the client to the server
    if (this.canSendMessage) {
      const currentMessage: Message = {
        type: 'FromClient',
        payload: this.message
      };
      this.signalRService.sendMessage(currentMessage);
      this.message = '';
    }
  }

  private subscribeToEvents(): void {
    this.signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalRService.messageReceived.subscribe((msg: Message) => {
      this.messages.push(msg.payload);
    });
  }
}

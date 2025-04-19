import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public dataReceived: any;
  private hubConnection!: signalR.HubConnection;
  // api = "https://2a74-2401-ba80-ac17-cd76-e8e9-39f8-be73-5adc.ngrok-free.app/sensorhub"
  api = "http://localhost:5299/sensorhub"


  constructor() { }


  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.api) 
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error connecting SignalR:', err));

    this.hubConnection.on('ReceiveSensorData', (data) => {
      console.log('Data received via SignalR:', data);
      this.dataReceived = data;
    });
  }

}

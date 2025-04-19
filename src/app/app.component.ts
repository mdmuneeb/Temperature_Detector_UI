import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { SignalRService } from './Services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent]
})
export class AppComponent {
  title = 'IOT APPLICATION';
  data:any
  constructor(private signalRService: SignalRService){}

  ngOnInit(): void {
    this.signalRService.startConnection();
    // Optionally subscribe to a Subject if you modify the service to use one
    setInterval(() => {
      this.data = this.signalRService.dataReceived;
    }, 1000);
  }
}

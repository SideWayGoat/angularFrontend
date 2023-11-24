import { Component } from '@angular/core';
import { RealtimedataComponent } from '../realtimedata/realtimedata.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private real: RealtimedataComponent){ }

  maxKwh = 0.0219
}

import { Component } from '@angular/core';

import { YahooService } from './services/yahoo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [YahooService]
})
export class AppComponent {

}

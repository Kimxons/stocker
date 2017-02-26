import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';    // To set title of the page

import { YahooService } from '../../services/yahoo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ticker:string;
  data:any;

  constructor(private titleService: Title,private _yahooService:YahooService) {
      this.titleService.setTitle('Stocker');           // Setting title statically
  }

// Function to fetch Data
fetchData(){
    this._yahooService.updateTicker(this.ticker);
    this._yahooService.getData().subscribe(data => {
      this.data = data.query;
      // console.log(data); // for debugging
    });
  }



  ngOnInit() {
    // this.ticker='GOOG';  // Initialised with Google data
    // this.fetchData();
  }

}

import { Component, OnInit } from '@angular/core';

import { YahooService } from '../../services/yahoo.service';

@Component({
  selector: 'app-ticker-screen',
  templateUrl: './ticker-screen.component.html',
  styleUrls: ['./ticker-screen.component.css']
})
export class TickerScreenComponent implements OnInit {

  tickerList='("GOOG","YHOO","AAPL","MSFT","AMZN","ADBE","AMD","LUV","CSCO","ZEUS","COOL","GRR","MMM","LOGI","BIZZ","LIFE","SYMC","WU","XRX")';
  yql_query='select * from yahoo.finance.quotes where symbol in '+this.tickerList;
  screen:any;

  fetchData(){
    this._yahooService.getTickerScreen(this.yql_query).subscribe(data => {
      this.screen = data;
      // console.log(data);   // for debugging
    });
  }

  constructor(private _yahooService:YahooService) { }

  ngOnInit() {
    this.fetchData();
  }

}

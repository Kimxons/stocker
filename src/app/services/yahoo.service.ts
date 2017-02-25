import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Injectable()
export class YahooService {
    private ticker:string;
    private temp:any;

    constructor(private _http: Http) {
        console.log('Yahoo Service Ready...');
    }

    // update ticker
    updateTicker(ticker:string){
      this.ticker=ticker;
    }

    // get data from Yahoo API and return as formatted JSON.
    getData(){
      return this._http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+this.ticker+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=').map(res=>res.json());
    }

    // get chart from Yahoo Finance Charts
    getChart(tkr:string,num:string,span:string){
      return 'https://chart.finance.yahoo.com/z?s='+tkr+'&t='+num+span+'&z=l&l=on&q=l';
    }

    // get Historical data using Yahoo Finance API
    getHistory(tkr:string,startDate:string,num:string,span:string){
      if (span=='y' && parseInt(num)>1){
        startDate=moment().add(-1, 'y').format('YYYY-MM-DD');
      } if (span=='m' && parseInt(num)>12){
        startDate=moment().add(-12, 'M').format('YYYY-MM-DD');
      } if (span==='d' && parseInt(num)>30){
        startDate=moment().add(-30, 'days').format('YYYY-MM-DD');
      }
      let endDate = moment().format('YYYY-MM-DD');
      // console.log(tkr+' '+startDate+' '+num+' '+span+' '+endDate); // debugging
      return this._http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20%20symbol%20=%20%22'+tkr+'%22%20and%20startDate%20=%20%22'+startDate+'%22%20and%20endDate%20=%20%22'+endDate+'%22&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=').map(data=>data.json());
  }
}

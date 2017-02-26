import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Injectable()
export class YahooService {
    private ticker:string;
    private temp:any;
    private yql_getdata:string;
    private url_getdata:string;

    constructor(private _http: Http) {
        console.log('Yahoo Service Ready...');
    }

    // update ticker
    updateTicker(ticker:string){
      this.ticker=ticker;
      this.yql_getdata='select * from yahoo.finance.quotes where symbol in ("'+this.ticker+'")';
      this.url_getdata='https://query.yahooapis.com/v1/public/yql?q='+this.yql_getdata+'&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=';
    }

    // get data from Yahoo API and return as formatted JSON.
    getData(){
      return this._http.get(encodeURI(this.url_getdata)).map(res=>res.json());
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
      let history_url = 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where  symbol = "'+tkr+'" and startDate = "'+startDate+'" and endDate = "'+endDate+'"&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=';
      return this._http.get(encodeURI(history_url)).map(data=>data.json());
  }
    getTickerScreen(yql_query:string) {
      let url_screen = 'https://query.yahooapis.com/v1/public/yql?q='+yql_query+'&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=';
      return this._http.get(encodeURI(url_screen)).map(data=>data.json());
    }
}

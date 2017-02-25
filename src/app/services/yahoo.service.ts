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



}

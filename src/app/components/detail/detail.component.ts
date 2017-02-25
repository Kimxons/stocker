import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';    // To set title of the page

import { YahooService } from '../../services/yahoo.service';

import * as moment from 'moment';   // to use dates

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  stock: any;
  chart:string;
  tkr:string;
  num:string;
  span:string;
  prev:string;
  history:any;

  options = [
       {id: 'd', name: "Day(s)"},
       {id: 'm', name: "Month(s)"},
       {id: 'y', name: "Year(s)"}
     ];

  constructor(private titleService: Title,private _yahooService:YahooService,private router:ActivatedRoute,) {

  }

  // Fetching stock data based on ticker
  fetchData(){
    this._yahooService.updateTicker(this.tkr);
    this._yahooService.getData().subscribe(data => {
      this.stock = data;
      this.titleService.setTitle(this.stock.query.results.quote.Name || 'Incorrect Ticker'); // Set Title of the page
      // console.log(data);   // for debugging
    });
  }

  // Fetching Historical Data
  fetchHistory(){
    this._yahooService.getHistory(this.tkr,this.prev,this.num,this.span).subscribe(data => {
      this.history=data.query;
      // console.log(this.history);
    });
  }

  // Refetching Data to update changes
  refetch(){
    document.getElementById('rotate').classList.add('fa-spin');  // for animated refresh button
    this.fetchData();
    setTimeout(function(){
        document.getElementById('rotate').classList.remove('fa-spin');
      }, 2000);
  }

  // Update Chart and Historical Data
  updData(){
    this.chart = this._yahooService.getChart(this.tkr,this.num,this.span);
    if (this.span == 'd'){
      this.prev=moment().add(-parseInt(this.num), 'days').format('YYYY-MM-DD');
    } else if (this.span == 'm') {
      this.prev=moment().add(-parseInt(this.num), 'M').format('YYYY-MM-DD');
    } else {
      this.prev=moment().add(-parseInt(this.num), 'y').format('YYYY-MM-DD');
    }
    this.fetchHistory();
  }

  ngOnInit() {

      if (!this.span){
        this.span='d';
      }
      if (!this.num){
        this.num='1';
      }

      this.router.params.subscribe((params) => {
        this.tkr = params['tkr'];    // save 'tkr' to variable
      });
      this.fetchData();
      this.chart=this._yahooService.getChart(this.tkr,'1','d');  // Initial Chart of 1 day on page load
      // console.log(this.chart);
      this.prev=moment().add(-1, 'd').format('YYYY-MM-DD');  // Initial Historical data for 1 day on page load
      this.fetchHistory();
  }

}

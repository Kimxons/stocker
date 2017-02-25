import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';    // To set title of the page

import { YahooService } from '../../services/yahoo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  stock: any;
  chart:string;
  tkr:string;

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

  // Refetching Data to update changes
  refetch(){
    document.getElementById('rotate').classList.add('fa-spin');  // for animated refresh button
    this.fetchData();
    setTimeout(function(){
        document.getElementById('rotate').classList.remove('fa-spin');
      }, 2000);
  }

  ngOnInit() {
      this.router.params.subscribe((params) => {
        this.tkr = params['tkr'];    // save 'tkr' to variable
      });
      this.fetchData();
      this.chart=this._yahooService.getChart(this.tkr,'1','d');
      console.log(this.chart);
  }

}

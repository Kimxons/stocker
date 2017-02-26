import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';    // To set title of the page
import { YahooService } from '../../services/yahoo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  table:any;
  zname:string;
  res:any;

  constructor(private _yahooService:YahooService, private titleService: Title) {
    this.titleService.setTitle('Get Ticker Symbol');
  }

  fetchTable(){
      this._yahooService.getTableData().subscribe(data => {
        this.table = data;
        // console.log(data); // for debugging
      });
    }

  filterData(){
    var str=this.zname.toLowerCase();
    this.res = this.table.filter(function(d) { return d.Name.toLowerCase().includes(str) || d.Symbol.toLowerCase().includes(str); });
  }

  ngOnInit() {
    this.fetchTable();
  }

}

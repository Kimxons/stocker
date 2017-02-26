import { Component, OnInit, Input } from '@angular/core';

import { YahooService } from '../../services/yahoo.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:any;
  @Input() num: number;

  constructor(private _yahooService:YahooService) { }

  // Function to fetch News
  fetchNews(){
      this._yahooService.getNews().subscribe(data => {
        this.news = data.query.results.item;
        // console.log(data);
      });
    }

  ngOnInit() {
    this.fetchNews();
  }

}

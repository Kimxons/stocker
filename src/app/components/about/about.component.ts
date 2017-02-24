import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';    // To set title statically

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private titleService: Title) {
      this.titleService.setTitle('About Stocker');       // Setting title of the page
  }

  ngOnInit() {
  }

}

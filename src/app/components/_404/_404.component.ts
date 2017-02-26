import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'err404',
  templateUrl: './_404.component.html',
  styleUrls: ['./_404.component.css']
})
export class _404Component implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('404 Page not Found');
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-url-results',
  templateUrl: './url-results.component.html',
  styleUrls: ['./url-results.component.css'],
  inputs:['results']
})
export class UrlResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

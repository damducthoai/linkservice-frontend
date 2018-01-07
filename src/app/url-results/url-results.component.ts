import { Component, OnInit, Inject } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';

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

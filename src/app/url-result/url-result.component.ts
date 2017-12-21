import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-url-result',
  templateUrl: './url-result.component.html',
  styleUrls: ['./url-result.component.css'],
  inputs: ['result']
})
export class UrlResultComponent implements OnInit {

  clickCount = 0;
  
  constructor() { }

  ngOnInit() {
  }

  clicked(){
    this.clickCount += 1;
  }

}

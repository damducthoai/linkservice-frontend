import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  backend_url = "http://localhost:8080";

  constructor() { }

  ngOnInit() {
  }

}

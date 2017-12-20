import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  backend_url = "http://localhost:8080";
  url_text ="asdd";
  url_password = "";
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.url_text + "|" + this.url_password);
  }

}

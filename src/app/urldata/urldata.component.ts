import { UrlDataValidators } from './urldata.validator';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  backend_url = "http://localhost:8080";
  url_pattern = "https://www.fshare.vn/file/[a-zA-Z0-9]+$";

  form = new FormGroup({
    'url_text': new FormControl("",[
      Validators.required,
      Validators.pattern(this.url_pattern)
    ]),
    'url_password': new FormControl()
  });

  constructor(private _http: Http) {
  }

  ngOnInit() {
  }

  submit(){
  }

  get url_text(){
    return this.form.get('url_text');
  }
  get url_password(){
    return this.form.get('url_password');
  }
}

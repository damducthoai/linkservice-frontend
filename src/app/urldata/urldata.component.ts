import { UrlResultComponent } from './../url-result/url-result.component';
import { AppResult } from './app-result';
import { GLCommon } from './messages';
import { AppError,NotFoundError } from './app-error';
import { UrlDataValidators } from './urldata.validator';
import { Http, Response, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  backend_url = "http://localhost:8080";
  backend_request = "http://localhost:8080/getlink";
  backend_info = "http://localhost:8080/info";
  url_pattern = "https://www.fshare.vn/file/[a-zA-Z0-9]+$";
  downloadUrl = "http://localhost:8080/download";
  
  form = new FormGroup({
    'url': new FormControl("",[
      Validators.required,
      Validators.pattern(this.url_pattern)
    ]),
    'password': new FormControl()
  });

  results: any[] = [];

  constructor(private _http: Http) {
  }

  ngOnInit() {
  }

  submit(){
    // this.x +=1;
    // //this.results.splice(0,0,{x:1});
    // this.results.push({
    //   url: "https://www.fshare.vn/file/P3YBDNV9AFYCJF6",
    //   time: 10000,
    //   size: "2GB",
    //   name: "xin chao cac ban xxx " + this.x + "xxxxxxxxxxx"
    // });
    // console.log(this.results);
    // this.appResult = new UrlResultComponent();
    let data = JSON.stringify(this.form.value);
    
    

    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');

    this._http.post(this.backend_request, data,options)
    .catch((error: Response) =>{
        if(error.status === 404){
          return Observable.throw(new NotFoundError(error));
        }
        return Observable.throw(new AppError(error));
    })
    .subscribe( (response: Response) => {
      if(response.status === 202){
        let res = JSON.parse(response['_body']);
        let key = res.url;
        //this.results.splice(0,0,res);
        console.log(res);
        let info_url = this.backend_info + "?url="+this.form.value.url;
        console.log("info: "+info_url);
        this._http.get(info_url)
        .catch((error: Response) =>{
          if(error.status === 404){
            return Observable.throw(new NotFoundError(error));
          }
          return Observable.throw(new AppError(error));
        })
        .subscribe((response: Response) => {
          if(response.status === 200){
            let res = JSON.parse(response['_body']);
            let info = {
                key: key,
                url: "#",
                name: res.name,
                size: res.size,
                return: false
            }
            this.results.splice(0,0,info);
            setTimeout(()=>{
              this._http.get(this.downloadUrl+"/"+key).catch((error: Response) =>{
                  if(error.status === 404){
                    return Observable.throw(new NotFoundError(error));
                  }
                  return Observable.throw(new AppError(error));
              }).subscribe((response: Response) => {
                if(response.status === 200){
                  console.log(" da hoan thanh");
                  info.url = response['_body'];
                  info.return = true;
                }else{
                  throw new AppError();
                }
              });
            },5000);
              
            //console.log(info);
            //console.log(this.results);
          }else{
            throw new AppError();
          }
        });
      }else{
        throw new AppError();
      }
    });
  }
  
  getInfo(url){
      this._http.get(url)
      .catch((error: Response) =>{
        if(error.status === 404){
          return Observable.throw(new NotFoundError(error));
        }
        return Observable.throw(new AppError(error));
      })
      .subscribe((response: Response) => {
        if(response.status === 202){
          let res = JSON.parse(response['_body']);
          //this.results.splice(0,0,res);
          console.log(res);
        }else{
          throw new AppError();
        }
      });
  }

  get url_text(){
    return this.form.get('url');
  }
  get url_password(){
    return this.form.get('password');
  }
}

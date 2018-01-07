import { UrlResultComponent } from './../url-result/url-result.component';
import { AppResult } from './app-result';
import { GLCommon } from './messages';
import { AppError,NotFoundError } from './app-error';
import { UrlDataValidators } from './urldata.validator';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { Observable } from 'rxjs/Observable';
import {EventSourcePolyfill} from 'ng-event-source';
import 'rxjs/Rx';
import * as EventSource from 'eventsource'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  backend_url = "http://localhost:8080";
  backend_request = "http://localhost:8080/linkservice";
  backend_info = "http://localhost:8080/info";
  url_pattern = "https://www.fshare.vn/file/[a-zA-Z0-9]+$";
  downloadUrl = "http://localhost:8080/download";

  resultUrl = "http://localhost:8080/result";

  form = new FormGroup({
    'url': new FormControl("",[
      Validators.required,
      Validators.pattern(this.url_pattern)
    ]),
    'password': new FormControl()
  });

  results: any[] = [];

  private clientId;

  constructor(private _http: Http,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }
  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

  private sseStream: Subscription;

  getClientId(){
    console.log('get id started');
    let idurl = 'http://localhost:8080/id';

    let headers = new Headers();
    let options = new RequestOptions({headers: headers, withCredentials: true });

    this._http.get(idurl,options).subscribe(
      (res) => {
        //console.log(res);
        this.clientId = res['_body'];
        console.log("get id success: "+this.clientId);
        this.getResult(this.clientId);
        console.log("listenning server event");
      },
      (err)=>{
          console.log(err);
           this.clientId = null;
      });
  }
  getResult(id:string){
    console.log("listenning at: "+id);
    let headers = new Headers();
    let options = new RequestOptions({headers: headers, withCredentials: true });
    let source = new EventSource('http://localhost:8080/result/'+id);
    
    source.onmessage = (data =>{
      console.log("receive new message");
      let res = JSON.parse(data['data']);
      console.log("xinc chao "+ res); 
      //this.showSuccess();
      this.toastr.info(res.original,"Request processed");
      this.results.splice(0,0,res);
      //console.log(this.results);
    });
    source.onopen = (a) => {
      console.log("on open event");
      console.log(a);
    };
    source.onerror = (e) =>{
      console.log("on error event");
      console.log(e);
      
    };
    
  }
  ngOnInit() {
    console.log("init started");
    this.getClientId();
    //this.getResult(this.clientId);
  }
  submit(){
    let jsonreq = { url: this.form.value.url,
      password:this.form.value.password,
      clientid: this.clientId
    };
    //let data = JSON.stringify(this.form.value);
    let data = JSON.stringify(jsonreq);

    console.log(data);
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let myoptions = new RequestOptions({headers: headers});
    
    this._http.post('http://localhost:8080/linkservice', data,myoptions)
    .catch((error: Response) =>{
        if(error.status === 404){
          return Observable.throw(new NotFoundError(error));
        }
        return Observable.throw(new AppError(error));
    })
    .subscribe( (response: Response) => {
      var res = JSON.parse(response['_body']);
      //console.log(response);
      console.log(res);
      this.toastr.success(res.msg, 'Success!');
      //this.results.splice(0,0,res);
      //this.getResult(res['id']);
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

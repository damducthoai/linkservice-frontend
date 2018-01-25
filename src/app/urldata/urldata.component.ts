import {AppError, NotFoundError} from './app-error';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import * as EventSource from 'eventsource'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-urldata',
  templateUrl: './urldata.component.html',
  styleUrls: ['./urldata.component.css']
})
export class UrldataComponent implements OnInit {

  server = "http://localhost:8080/";

  url_pattern = "https://www.fshare.vn/(folder)|(file)/[a-zA-Z0-9]+(/?)";

  requested = 0;

  headers = new Headers();

  requestOptions : RequestOptions;

  form = new FormGroup({
    'url': new FormControl("",[
      Validators.required,
      Validators.pattern(this.url_pattern)
    ]),
    'password': new FormControl()
  });

  enableinput = true;

  results: any[] = [];

  constructor(private _http: Http,public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public progress: NgProgress) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  getResult(){

    let source = new EventSource(this.server + "result", {withCredentials: true});

    source.onmessage = (data =>{
      console.log("receive new message");
      let res = JSON.parse(data['data']);

      if(res.success){
        this.toastr.info(res.original,"Request processed");

        this.results.splice(0,0,res);
      } else{
        this.toastr.warning(res.original, "Cannot process");
      }

    });
    source.onopen = (a) => {
      this.toastr.success("Welcome to my website","Connected!");
      console.log("on open event");
      console.log(a);
    };
    source.onerror = (e) =>{
      this.toastr.error("Server not available","Error!");
      console.log("on error event");
      console.log(e);
    };

  }
  ngOnInit() {
    this.headers.append('Content-Type', 'application/json');
    this.requestOptions = new RequestOptions({headers: this.headers, withCredentials: true });

    console.log("init started");
    this.getResult();
  }
  submit(){
    this.requested += 1;
    this.enableinput = false;
    this.progress.start();

    let jsonreq = { url: this.form.value.url,
      password:this.form.value.password
    };
    let data = JSON.stringify(jsonreq);

    console.log(data);

    this.form.reset();
    this._http.post(this.server+'linkservice', data,this.requestOptions)
    .catch((error: Response) =>{
      this.toastr.error("cannot process request","Error!");
      this.progress.done();
        if(error.status === 404){
          return Observable.throw(new NotFoundError(error));
        }
        return Observable.throw(new AppError(error));

    })
    .subscribe( (response: Response) => {
      var res = JSON.parse(response['_body']);

      console.log(res);
      this.toastr.success(res.msg, 'Success!');

      this.progress.done();
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

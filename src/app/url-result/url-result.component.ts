import { NotFoundError, AppError } from './../urldata/app-error';
import { Http } from '@angular/http';
import { Component, OnInit,Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'app-url-result',
  templateUrl: './url-result.component.html',
  styleUrls: ['./url-result.component.css'],
  inputs: ['result','test','results','i','total']
})
export class UrlResultComponent implements OnInit {

  //@Input() key:string;

  //@Input() result:any;

  downloadUrl = "http://localhost:8080/download";

  clickCount = 0;
  
  constructor(private _http: Http) { }

  ngOnInit() {
  }

  clicked(){
    //let url = this.downloadUrl + "/" + this.key;
    this.clickCount += 1;
    //console.log(this.result.original);
    // console.log(this.key);
    // this._http.get(url).catch((error: Response) =>{
    //     if(error.status === 404){
    //       return Observable.throw(new NotFoundError(error));
    //     }
    //     return Observable.throw(new AppError(error));
    // }).subscribe((response: Response) => {
    //   if(response.status === 200){
    //     console.log("Ket qua:"+response['_body']);
        
    //   }else{
    //     throw new AppError();
    //   }
    // });
  }

}

import {Http} from '@angular/http';

export class RestClient{
    
    constructor(private _http: Http) {
    
    }
    get getClient(){
        return this._http;
    }
}

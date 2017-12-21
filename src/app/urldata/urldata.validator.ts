import {AbstractControl} from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';


export class UrlDataValidators {
    constructor() {
    }
    static healthCheck(control: AbstractControl) : Promise<ValidationErrors | null> {
        
        let health_check_server = "http://localhost:8080/health" + "?url="+control.value;

        console.log("Begin request: " + health_check_server);

        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(control.value == 'https://www.fshare.vn/file/P3YBDNV9AFYCJF6'){
                    resolve({shoudBeUnique:false});               
                } else {
                    resolve(null);
                }

            },2000);
        });
    }
}
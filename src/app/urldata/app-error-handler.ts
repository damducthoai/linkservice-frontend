import {ErrorHandler} from '@angular/core';
import {GLCommon} from './messages';

export class AppErrorHandler extends ErrorHandler{
    handleError(error){
        console.log("day la handler he thong");
        console.log(GLCommon.msg['undefinedError']);
    }
}

import { error } from 'selenium-webdriver';
import { ErrorHandler } from '@angular/core/src/error_handler';
import { GLCommon } from './messages';

export class AppError {
    constructor(originalError ?: any){
    }
}

export class NotFoundError extends AppError{
}

export class UrlNotSupport extends AppError{
}

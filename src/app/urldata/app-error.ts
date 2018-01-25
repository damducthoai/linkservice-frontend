export class AppError {
    constructor(originalError ?: any){
    }
}

export class NotFoundError extends AppError{
}

export class UrlNotSupport extends AppError{
}

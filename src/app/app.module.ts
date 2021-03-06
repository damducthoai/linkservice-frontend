import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UrldataComponent} from './urldata/urldata.component';
import {UrlResultComponent} from './url-result/url-result.component';
import {UrlResultsComponent} from './url-results/url-results.component';
import {StringLimitPipe} from './string-limit.pipe';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgProgressModule} from '@ngx-progressbar/core';

@NgModule({
  declarations: [
    AppComponent,
    UrldataComponent,
    UrlResultComponent,
    UrlResultsComponent,
    StringLimitPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    NgProgressModule.forRoot()
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

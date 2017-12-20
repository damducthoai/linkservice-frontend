import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { UrldataComponent } from './urldata/urldata.component';



@NgModule({
  declarations: [
    AppComponent,
    UrldataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

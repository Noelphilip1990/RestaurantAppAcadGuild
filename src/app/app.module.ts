import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule , JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapApp } from './MapComponenet';
import{ MapService } from './MapService';
import { RatingModule } from "ng2-rating";
import {Ng2PaginationModule} from 'ng2-pagination';
@NgModule({
  declarations: [
    AppComponent,
    MapApp
  ],
  imports: [
    Ng2PaginationModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,   
    HttpModule,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvtzk4UHVyc9hvEuMPJdPH5xu4xVfRA7s',
      libraries: ["places"]
    })
    
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }

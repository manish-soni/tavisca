import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import { TrainsComponent } from './trains/trains.component';
import { BusComponent } from './bus/bus.component';
import { SortPageComponent } from './sort-page/sort-page.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    FlightDetailsComponent,
    HotelsComponent,
    TrainsComponent,
    BusComponent,
    SortPageComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

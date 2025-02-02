import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { HotelsComponent } from './hotels/hotels.component';
import { TrainsComponent } from './trains/trains.component';
import { BusComponent } from './bus/bus.component';
import { SortPageComponent } from './sort-page/sort-page.component';
import { FilterComponent } from './filter/filter.component';
const routes: Routes = [
  { path: 'flight', component: FlightComponent },
  { path: '',   redirectTo: '/flight', pathMatch: 'full' }, // redirect to `flight component`
  { path: 'hotel', component: HotelsComponent },
  { path: 'trains', component: TrainsComponent },
  { path: 'buses', component: BusComponent },
  { path: 'flight-details', component: FlightDetailsComponent },
  { path: 'sort-by', component: SortPageComponent},
  { path: 'filters',component: FilterComponent},
  { path: '**', component: FlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

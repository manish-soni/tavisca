import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
const routes: Routes = [
  { path: 'flight', component: FlightComponent },
  { path: 'flight-details', component: FlightDetailsComponent },
  { path: '',   redirectTo: '/flight', pathMatch: 'full' }, // redirect to `flight component`
  { path: '**', component: FlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

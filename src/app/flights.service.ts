import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getFlightNames() {
    return this.http.get('./assets/flights.json');
  }
  getAllFlight(flight) {
    // no use of flight data here but added in case we get API to retrieve data for actual search
    return this.http.get('./assets/flightData.json');
  }
}

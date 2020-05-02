import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FlightsService } from './../flights.service';
@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  public currentFlight = {};
  public departure = '';
  public destination = '';
  public departDate = '';
  public returnDate = '';
  private month = {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'};
  public flightData = [];
  constructor(private router: Router, private http: HttpClient, private flightServ: FlightsService) { }

  ngOnInit(): void {
    this.getUserInput();
    this.sortMethod();
  }
  getUserInput() {
    this.currentFlight = JSON.parse(sessionStorage.getItem('flightInfo'));
    if (this.currentFlight) {
      this.departure = this.currentFlight['departure'].slice(1, 4);
      this.destination = this.currentFlight['destination'].slice(1, 4);
      const departDT = new Date(this.currentFlight['departDate']);
      this.departDate = this.month[departDT.getMonth()] + ' ' + departDT.getDate();
      const returnDT = this.currentFlight['returnDate']? new Date(this.currentFlight['returnDate']): '';
      this.returnDate = returnDT? this.month[returnDT.getMonth()] + ' ' + returnDT.getDate() : '';
      this.getFlights(this.currentFlight);
    }
  }
  sortMethod() {
   const sortMode = sessionStorage.getItem('sortMode');
   if (sortMode === 'LTHPrice') {
    this.flightData.sort(function (a, b) {
      if (a['economy'] > b['economy']) return -1;
      if (a['economy'] < b['economy']) return 1;
      if (a['economy'] === b['economy']) return 0;
    });
   } else if (sortMode === 'HTLPrice') {

   } else if (sortMode === 'LTHDuration') {

   } else if (sortMode === 'HTLDuration') {

   } else if (sortMode === 'ATZ') {
     
  } else if (sortMode === 'ZTA') {
     
  }
  }
  
  getFlights(currentFlight) {
    // tried to get data from API but authentication and header keys were required and so changed the 
    // approach to get data from static JSON
  
    // const url = 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search';
    // const request = { "TripType": "O", "NoOfAdults": 1, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [ { "Origin": "SFO", "Destination": "LAX", "TravelDate": "04/23/2018" } ], "Currency": "USD" };
    // this.http.post(url, request).subscribe(data => {
    //   console.log(data);
    // })
    this.flightServ.getAllFlight(currentFlight).subscribe(data => {
      this.flightData = data['airports'];
      console.log(this.flightData);
    })
  }
  editFlight() {
    this.router.navigate(['/flight']);
  }
  navigateBack() {
    sessionStorage.removeItem('flightInfo');
    this.router.navigate(['/flight']);
  }
  toSortPage() {
    this.router.navigate(['/sort-by']);
  }
  toFilters() {
    this.router.navigate(['/filters']);
  }
}

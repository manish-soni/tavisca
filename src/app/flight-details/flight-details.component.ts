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
  public currentClass = '';
  private originalFlightData = [];
  constructor(private router: Router, private http: HttpClient, private flightServ: FlightsService) { }

  ngOnInit(): void {
    this.getUserInput();
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
      this.currentClass = this.currentFlight['travelClass'];
      this.getFlights(this.currentFlight);
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
      // stored backup of data to apply filters
      this.originalFlightData = this.flightData;
      if (sessionStorage.getItem('sortMode')) {
        this.sortMethod(this.currentFlight['travelClass'])
      }
      if (sessionStorage.getItem('filterOption')) {
        this.filterOnCurrentData();
      }
    })
    
  }
  filterOnCurrentData() {
    const filterOpt = JSON.parse(sessionStorage.getItem('filterOption'))? JSON.parse(sessionStorage.getItem('filterOption')) : '';
    console.log(filterOpt)

    // {minPrice: 450, maxPrice: 550, economy: true, main: true, …}
    // need to modify the function based on min and max value 

    // this.flightData = this.flightData.filter(function(item) {
    //   for (var key in filterOpt) {
    //     if (item[key] === undefined || item[key] != filterOpt[key])
    //       return false;
    //   }
    //   return true;
    // });
  }
  sortMethod(travelClass) {
    console.log(this.flightData);
   const travelType = travelClass.toLowerCase();
   const sortMode = (sessionStorage.getItem('sortMode'))? sessionStorage.getItem('sortMode'): '';
   if (sortMode === 'LTHPrice') {
    this.flightData.sort(function (a, b) {
      return a[travelType] - b[travelType];
    });
   } else if (sortMode === 'HTLPrice') {
    this.flightData.sort(function (a, b) {
      return b[travelType] - a[travelType];
    });
   } else if (sortMode === 'LTHDuration') {
    this.flightData.sort(function (a, b) {
      return a.duration - b.duration;
    });
   } else if (sortMode === 'HTLDuration') {
    this.flightData.sort(function (a, b) {
      return b.duration - a.duration;
    });
   } else if (sortMode === 'ATZ') {
    this.flightData.sort(function (a, b) {
      if (a['flightName'] > b['flightName']) return -1;
      if (a['flightName'] < b['flightName']) return 1;
       return 0;
    });
  } else if (sortMode === 'ZTA') {
    this.flightData.sort(function (a, b) {
      if (a['flightName'] < b['flightName']) return -1;
      if (a['flightName'] > b['flightName']) return 1;
       return 0;
    });     
  }
  }

  editFlight() {
    sessionStorage.removeItem('sortMode')
    this.router.navigate(['/flight']);
  }
  navigateBack() {
     sessionStorage.removeItem('sortMode');
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

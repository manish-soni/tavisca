import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserInput();
    this.getFlights();
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
    
    }
  }
  getFlights() {
    const url = 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search';
    const request = { "TripType": "O", "NoOfAdults": 1, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [ { "Origin": "SFO", "Destination": "LAX", "TravelDate": "04/23/2018" } ], "Currency": "USD" };
    this.http.post(url, request).subscribe(data => {
      console.log(data);
    })
  }
  editFlight() {
    this.router.navigate(['/flight']);
  }
  navigateBack() {
    sessionStorage.removeItem('flightInfo');
    this.router.navigate(['/flight']);
  }
}

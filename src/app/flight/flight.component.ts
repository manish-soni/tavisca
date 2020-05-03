import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlightsService } from './../flights.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
public flightNames = [];
public flightForm;
public departureError: boolean = false;
public destinationError: boolean = false;
public travellersError: boolean = false;
public travelclass = ['business', 'economy', 'main'];
  constructor(private flightServ: FlightsService, private router: Router) { }

  ngOnInit(): void {
    this.flightForm = new FormGroup({
      departure: new FormControl(''),
      destination: new FormControl(''),
      departDate: new FormControl(''),
      returnDate: new FormControl(''),
      travellers: new FormControl(''),
      travelClass: new FormControl('')
    });

    this.flightServ.getFlightNames().subscribe(data => {
      this.flightNames = data['airports'];
     // console.log(this.flightNames);
    })
    const editForm = sessionStorage.getItem('flightInfo')? JSON.parse(sessionStorage.getItem('flightInfo')): '';
    if (editForm) {
      this.flightForm.patchValue({
        departure: editForm.departure,
        destination: editForm.destination,
        departDate: editForm.departDate,
        returnDate: editForm.returnDate,
        travellers: editForm.travellers,
        travelClass: editForm.travelClass
      });
    }
    this.removeSessionData();
  }
  // removed filters and sort modes
  removeSessionData() {
    sessionStorage.getItem('filterOption')? sessionStorage.removeItem('filterOption'): '';
    sessionStorage.getItem('sortMode')? sessionStorage.removeItem('sortMode'): '';
  }
// to check airport names are not same
  checkAirports(event, field) {
    if (this.flightForm.controls['departure'].value && this.flightForm.controls['destination'].value) {
      if (this.flightForm.controls['departure'].value === this.flightForm.controls['destination'].value) {
        if (field === 'departure') {
          this.departureError = true;
        } else {
          this.destinationError = true;
        }
      } else {
        this.departureError = false;
        this.destinationError = false;
      }
    }
  }
  // to check the number of travellers are not greater than 5
  checkinput(event) {
    if (Number(this.flightForm.controls['travellers'].value) < 1 || Number(this.flightForm.controls['travellers'].value) > 5) {
      this.flightForm.controls['travellers'].value = '';
      event.target.value = '';
      this.travellersError = true;
    } else {
      this.travellersError = false;
    }
  }
  onSubmit() {
    sessionStorage.setItem('flightInfo', JSON.stringify(this.flightForm.value));
    this.router.navigate(['/flight-details']);
  }
}

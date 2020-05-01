import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { FlightsService } from './../flights.service';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
public flightNames = {};
public flightForm;
public classList = ['Business', 'Economy', 'First'];
  constructor(private flightServ: FlightsService) { }

  ngOnInit(): void {
    this.flightForm = new FormGroup({
      departure: new FormControl('')
    });

    this.flightServ.getFlightNames().subscribe(data => {
      this.flightNames = data['airports'];
      console.log(this.flightNames);
    })
  }

  onSubmit() {
    console.log(this.flightNames);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightComponent } from './flight.component';
import { FlightsService } from './../flights.service';
fdescribe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

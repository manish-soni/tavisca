import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
public filterForm;
  constructor() { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
      priceRange: new FormControl(''),
      economy: new FormControl(''),
      main: new FormControl(''),
      business: new FormControl('')
    });
  }
  naviagateBack() {

  }
  reset() {

  }
  submitFilter() {
    
  }
}

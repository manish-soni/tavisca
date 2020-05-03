import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
public filterForm;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
      economy: new FormControl(''),
      main: new FormControl(''),
      business: new FormControl('')
    });
  }
  naviagateBack() {
    this.router.navigate(['/flight-details']);
  }
  reset() {
    this.filterForm.reset();
  }
  submitFilter() {
    // iterating object to get only the values which need to be filtered
    const finalFilter = {}
    for (let key of Object.keys(this.filterForm.value)) {
      let userResp = this.filterForm.value[key];
      if (userResp !== '') { 
        finalFilter[key] = userResp;
      }
    }
    console.log(finalFilter)
    sessionStorage.setItem('filterOption', JSON.stringify(finalFilter));
    this.router.navigate(['/flight-details']);
  }
}

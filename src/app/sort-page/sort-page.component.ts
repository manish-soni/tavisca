import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sort-page',
  templateUrl: './sort-page.component.html',
  styleUrls: ['./sort-page.component.scss']
})
export class SortPageComponent implements OnInit {
  public sortForm;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sortForm = new FormGroup({
      sortOption: new FormControl(''),
  });
  sessionStorage.removeItem('sortMode');
}
getSortMode() {
  sessionStorage.setItem('sortMode',this.sortForm.controls['sortOption'].value);
  this.router.navigate(['/flight-details']);
 }
 navigateBack() {
  this.router.navigate(['/flight-details']);
 }
}

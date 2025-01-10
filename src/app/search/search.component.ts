import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchFrom: FormGroup = new FormGroup({
    term: new FormControl("", Validators.required)
  });

  constructor(private router: Router) {
  }

  onSubmit() {
    //TODO: navigate to search page
  }
}

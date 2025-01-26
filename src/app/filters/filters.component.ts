import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  onFilterApply = output<FormGroup>();
  filters: FormGroup = new FormGroup({
    sort: new FormControl(0, Validators.required),
    root: new FormControl(false)
  })

  onSubmit() {
    if (this.filters.invalid) {
      return;
    }
    this.onFilterApply.emit(this.filters);
  }
}

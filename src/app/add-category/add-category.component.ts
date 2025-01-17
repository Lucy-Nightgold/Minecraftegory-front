import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../entities/category.entity';
import {CategoryService} from '../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  catgeoryForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.compose(
      [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]
    )),
    parentId: new FormControl("", Validators.required)
  })

  potentialParents: Category[] = [];

  constructor(private service: CategoryService, private router: Router) {}

  ngOnInit() {
    this.service.getAllCategories().subscribe(categories => {
      this.potentialParents = categories;
    })
  }

  onSubmit() {
    if (this.catgeoryForm.invalid) {
      console.log(this.catgeoryForm.controls['name'].valid + ":" + this.catgeoryForm.controls['parentId'].valid);
      return;
    }
    this.service.sendCategory(this.catgeoryForm.controls['name'].value, this.catgeoryForm.controls['parentId'].value).subscribe(() => {
      this.router.navigate(['']);
    })
  }
}

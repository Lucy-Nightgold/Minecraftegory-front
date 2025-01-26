import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../entities/category.entity';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.compose(
      [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]
    )),
    parentId: new FormControl("", Validators.required)
  })

  id: number = 0;

  potentialParents: Category[] = [];

  constructor(private service: CategoryService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] == undefined ? 0: +params['id'];
      if (this.id != 0) {
        this.service.getCategory(this.id).subscribe(category => {
          this.categoryForm.controls['name'].setValue(category.name);
          this.categoryForm.controls['parentId'].setValue(category.parentId);
          this.service.getAvailableParents(category.id).subscribe(categories => {
            this.potentialParents = categories;
          })
        })
      } else {
        this.service.getAllCategories().subscribe(categories => {
          this.potentialParents = categories;
        })
      }
    })
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.id == 0) {
      this.service.sendCategory(this.categoryForm.controls['name'].value, this.categoryForm.controls['parentId'].value).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.service.updateCategory(this.id, this.categoryForm.controls['name'].value, this.categoryForm.controls['parentId'].value).subscribe(() => {
        this.router.navigate(['']);
      })
    }
  }
}

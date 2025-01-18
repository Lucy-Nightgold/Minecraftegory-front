import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Category} from '../entities/category.entity';
import {CategoryService} from '../services/category.service';
import {CategoriesListComponent} from '../categories-list/categories-list.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-content',
  imports: [
    CategoriesListComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @Input() id: number = 0;
  page: number = 1;
  category: Category | null = null;
  parent: Category | null = null;
  categories: Category[] = [];
  displayedCategories: Category[] = [];
  potentialParents: Category[] = [];
  maxPage: number = 1;
  readonly CATEGORIES_PER_PAGE = 10;

  updateForm = new FormGroup({
    name: new FormControl("", Validators.compose(
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]
    )),
    parentId: new FormControl(0, Validators.required)
  })

  constructor(private route: ActivatedRoute, private service: CategoryService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] == undefined ? 0: +params['id'];
      this.page = params['page'] == undefined ? 1: +params['page'];
      if (this.id == 0) {
        this.service.getRootCategories().subscribe(categories => {
          this.pagination(categories);
        })
      } else {
        this.service.getCategory(this.id).subscribe(category => {
          this.category = category;
          this.updateForm.controls['name'].setValue(this.category.name);
          this.updateForm.controls['parentId'].setValue(this.parent?.id == undefined ? 0: this.parent.id);
          this.service.getParent(this.category.id).subscribe(parent => {
            this.parent = parent;
          })
          this.service.getChildren(this.category.id).subscribe(children => {
            this.pagination(children);
          })
          this.service.getAvailableParents(this.category.id).subscribe(parents => {
            this.potentialParents = parents;
          })
        })
      }

    })
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    let name: string = this.updateForm.controls['name'].value == null ? "": this.updateForm.controls['name'].value;
    let parentId: number = this.updateForm.controls['parentId'].value == null ? 0: this.updateForm.controls['parentId'].value;
    this.service.updateCategory(this.id, name, parentId).subscribe(() => {
      alert("category updated successfully");
    });
  }

  delete() {
    this.service.deleteCategory(this.id).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  nextPage() {
    if (this.page < this.maxPage) {
      this.page++;
      this.pagination(this.categories);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.pagination(this.categories);
    }
  }

  private pagination(categories: Category[]) {
    this.categories = categories;
    this.maxPage = Math.ceil(categories.length / this.CATEGORIES_PER_PAGE);
    if (this.page < 1 || this.page > this.maxPage) {
      this.page = 1;
    }
    const startIndex = (this.page - 1) * this.CATEGORIES_PER_PAGE;
    const endIndex = Math.min(categories.length, this.page * this.CATEGORIES_PER_PAGE);
    console.log(this.maxPage);
    console.log(startIndex);
    console.log(endIndex);
    console.log(categories.length)
    this.displayedCategories = categories.slice(startIndex, endIndex);
    console.log(this.displayedCategories)
  }
}

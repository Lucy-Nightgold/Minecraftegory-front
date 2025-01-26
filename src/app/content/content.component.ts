import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../entities/category.entity';
import {CategoryService} from '../services/category.service';
import {CategoriesListComponent} from '../categories-list/categories-list.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagesNavComponent} from '../pages-nav/pages-nav.component';
import {FiltersComponent} from '../filters/filters.component';

@Component({
  selector: 'app-content',
  imports: [
    CategoriesListComponent,
    FormsModule,
    ReactiveFormsModule,
    PagesNavComponent,
    FiltersComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  categories: Category[] = [];
  maxPage: number = 1;
  readonly CATEGORIES_PER_PAGE = 10;
  term: string = "";
  sort: number = 0;
  page: number = 1;
  categoryChildren: Map<Category, Category[]> = new Map();

  constructor(private route: ActivatedRoute, private service: CategoryService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categories = [];
      this.maxPage = 1;
      this.term = params['term'] == undefined ? "": params['term'];
      this.getCategories(1, this.sort);

    })
  }

  changePage(page: number) {
    this.page = page;
    this.getCategories(page, this.sort);
  }

  updateFilers(filters: FormGroup) {
    const sort: number = filters.controls['sort'].value;
    this.getCategories(this.page, sort);
  }

  private getCategories(page: number, sort: number) {
    this.sort = sort;
    if (this.term == "") {
      this.service.getCategories(page - 1, this.CATEGORIES_PER_PAGE, sort).subscribe(page => {
        this.categories = page.categories;
        this.maxPage = page.maxPage;
        this.setChildren()
      })
    } else {
      this.service.searchCategories(this.term, page - 1, this.CATEGORIES_PER_PAGE, sort).subscribe(page => {
        this.categories = page.categories;
        this.maxPage = page.maxPage;
        this.setChildren();
      })
    }
  }

  private setChildren() {
    for (const category of this.categories) {
        this.service.getChildren(category.id).subscribe(children => {
          console.log(category.name + " :");
          console.log(children);
          if (children.length > 0) {
            this.categoryChildren.set(category, children);
          }
        })
    }
  }
}

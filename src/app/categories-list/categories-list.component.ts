import {Component, Input} from '@angular/core';
import {Category} from '../entities/category.entity';
import {RouterLink} from '@angular/router';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-categories-list',
  imports: [
    RouterLink
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {

  @Input() categories: Category[] = [];

  constructor(private service: CategoryService) {
  }

  delete(id: number) {
    this.service.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== id);
    })
  }
}

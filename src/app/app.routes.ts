import { Routes } from '@angular/router';
import {AddCategoryComponent} from './add-category/add-category.component';
import {ContentComponent} from './content/content.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'add', component: AddCategoryComponent},
  { path: ':id', component: ContentComponent}
];

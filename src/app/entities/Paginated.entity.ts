import {Category} from './category.entity';

export interface Paginated {
  page: number;
  maxPage: number;
  categories: Category[];
}

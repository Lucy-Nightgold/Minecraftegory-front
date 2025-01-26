import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../entities/category.entity';
import {Paginated} from '../entities/Paginated.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  ApiUrl: string = "http://localhost:8080/category";

  constructor(private http: HttpClient) { }

  getCategory(id: number) {
    return this.http.get<Category>(`${this.ApiUrl}/${id}`);
  }

  getChildren(id: number) {
    return this.http.get<Category[]>(`${this.ApiUrl}/children/${id}`);
  }

  getAvailableParents(id: number) {
    return this.http.get<Category[]>(`${this.ApiUrl}/parent/available/${id}`);
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.ApiUrl);
  }

  getCategories(page: number, categoriesPerPage: number, sort: number) {
    const params = {
      categoriesPerPage: categoriesPerPage,
      sortValue: sort
    }
    return this.http.get<Paginated>(`${this.ApiUrl}/page/${page}`, {params: params});
  }

  searchCategories(term: string, page: number, categoriesPerPage: number, sort: number) {
    const params = {
      page: page,
      categoriesPerPage: categoriesPerPage,
      sortValue: sort
    }
    return this.http.get<Paginated>(`${this.ApiUrl}/search/${term}`, {params: params});
  }


  sendCategory(name: string, parentId: number) {
    const body = {
      name: name,
      parentId: parentId
    }
    return this.http.post<Category>(this.ApiUrl, body);
  }

  updateCategory(id: number, name: string, parentId: number) {
    const body = {
      name: name,
      parentId: parentId
    }
    return this.http.put<Category>(`${this.ApiUrl}/${id}`, body);
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>(`${this.ApiUrl}/${id}`);
  }
}

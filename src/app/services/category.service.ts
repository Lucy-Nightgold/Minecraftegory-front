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

  getParent(id: number) {
    return this.http.get<Category>(`${this.ApiUrl}/parent/${id}`);
  }

  getChildren(id: number, page: number, categoriesPerPage: number) {
    const params = {
      page: page,
      categoriesPerPage: categoriesPerPage
    }
    return this.http.get<Paginated>(`${this.ApiUrl}/children/${id}`, {params: params});
  }

  getRootCategories(page: number, categoriesPerPage: number) {
    const params = {
      page: page,
      categoriesPerPage: categoriesPerPage
    }
    return this.http.get<Paginated>(`${this.ApiUrl}/root`, {params: params});
  }

  getAvailableParents(id: number) {
    return this.http.get<Category[]>(`${this.ApiUrl}/parent/available/${id}`);
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.ApiUrl);
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

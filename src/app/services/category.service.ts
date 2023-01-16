import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({ providedIn: 'root'} )
export class CategoryService {

  constructor(private http: HttpClient) {}

  fetchAllCategories() {
    return this.http
      .get<Category[]>(
        'http://localhost:8080/api/v1/category'
      )
      .pipe(
        map(categories => {
          return categories.map(category => {
            return {
              ...category,
              products: category.products ? category.products : []
            };
          });
        })
      )
  }

  fetchCategoryById(id: number) {
    return this.http
      .get<Category>(
        'http://localhost:8080/api/v1/category/' + id
      );
  }

  addCategory(newCategory: Category) {
    return this.http
      .post(
        'http://localhost:8080/api/v1/category/add',
        newCategory
      );
  }

  updateCategory(category: Category) {
    return this.http
      .post(
        'http://localhost:8080/api/v1/category/update',
        category
      );
  }

  deleteCategory(categoryId: number) {
    return this.http
      .delete(
        'http://localhost:8080/api/v1/category/' + categoryId
      );
  }
}

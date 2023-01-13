import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category.model";
import {Product} from "../models/product.model";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  categories: Array<Category> = [];
  products: Array<Product> = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {}

  ngOnInit() {
    this.categoryService.fetchAllCategories().subscribe(
      response => {
        this.categories = response;
      }, () => {}
    );

    this.productService.fetchAllProducts().subscribe(
      response => {
        this.products = response;
      }, () => {}
    )
  }

  editCategory(category: Category) {
    this.router.navigate(['/category/update', category.id]);
  }

  editProduct(product: Product) {
    this.router.navigate(['/product/update', product.id]);
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe(
      () => {
        for(let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === category) {
            this.categories.splice(i, 1);
          }
        }
      }, () => {}
    )
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        for(let i = 0; i < this.products.length; i++) {
          if (this.products[i] === product) {
            this.products.splice(i, 1);
          }
        }
      }, () => {}
    )
  }
}

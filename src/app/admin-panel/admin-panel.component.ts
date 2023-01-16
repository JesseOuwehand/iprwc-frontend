import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category.model";
import {Product} from "../models/product.model";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
import {Message} from "../models/message.model";
import {MessageService} from "../services/message.service";

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
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    this.categoryService.fetchAllCategories().subscribe(
      response => {
        this.categories = response;
      }, () => {
        const message = new Message(
          'Error',
          'Could not fetch categories!'
        )
        this.messageService.toggleToast(
          message
        );
      }
    );

    this.productService.fetchAllProducts().subscribe(
      response => {
        this.products = response;
      }, () => {
        const message = new Message(
          'Error',
          'Could not fetch products!'
        )
        this.messageService.toggleToast(
          message
        );
      }
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
        const message = new Message(
          'Success',
          'Category deleted!'
        )
        this.messageService.toggleToast(
          message
        );
        for(let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === category) {
            this.categories.splice(i, 1);
          }
        }
      }, () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
      }
    )
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        const message = new Message(
          'Success',
          'Product deleted!'
        )
        this.messageService.toggleToast(
          message
        );
        for(let i = 0; i < this.products.length; i++) {
          if (this.products[i] === product) {
            this.products.splice(i, 1);
          }
        }
      }, () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
      }
    )
  }
}

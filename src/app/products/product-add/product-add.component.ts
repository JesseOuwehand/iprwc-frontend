import { Component, OnInit } from '@angular/core';
import { Category } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { ProductDto } from "../../dto/product.dto";
import {ActivatedRoute, Params} from "@angular/router";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  categories: Category[] = [];
  addProductForm: FormGroup;
  isLoading: boolean = false;
  isLoadingButton: boolean = false;
  productToUpdate: Product;


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchAllCategories();
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.isLoading = true;
        this.productService.fetchProductById(params['id'])
          .subscribe(product => {
            this.productToUpdate = product;
            this.addProductForm = new FormGroup({
              'productName': new FormControl(product.name, Validators.required),
              'productDescription': new FormControl(product.description, Validators.required),
              'productImage': new FormControl(product.imageUrl, Validators.required),
              'price': new FormControl(product.price, Validators.required),
              'inventory': new FormControl(product.inventory, Validators.required),
              'category': new FormControl(product.category),
            });
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
          })
      } else {
        this.addProductForm = new FormGroup({
          'productName': new FormControl('', Validators.required),
          'productDescription': new FormControl('', Validators.required),
          'productImage': new FormControl('', Validators.required),
          'price': new FormControl(0, Validators.required),
          'inventory': new FormControl(0, Validators.required),
          'category': new FormControl(this.categories[0]),
        });
      }
    });
  }

  fetchAllCategories() {
    this.isLoadingButton = true;
    this.categoryService.fetchAllCategories().subscribe(categories => {
      this.categories = categories;
      this.isLoadingButton = false;
    })
  }

  onSubmit() {
    this.isLoadingButton = true;
    const newProduct = new ProductDto(
      this.addProductForm.get('productName').value,
      this.addProductForm.get('productDescription').value,
      this.addProductForm.get('productImage').value,
      this.addProductForm.get('price').value,
      this.addProductForm.get('inventory').value,
      Number(this.addProductForm.get('category').value)
    );
    if (this.productToUpdate !== undefined) {
      newProduct.id = this.productToUpdate.id;
      this.productService.updateProduct(newProduct).subscribe(
        response => {
          this.isLoadingButton = false;
        }, error => {
          this.isLoadingButton = false;
        }
      )
    } else {
      this.productService.addProduct(newProduct).subscribe(() => {
        this.isLoadingButton = false;
      }, () => {
        this.isLoadingButton = false;
      })
    }
  }
}

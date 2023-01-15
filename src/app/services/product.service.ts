import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { ProductDto } from "../dto/product.dto";

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {}

  addProduct(newProduct: ProductDto) {
    return this.http
      .post(
        'http://bayoucountry.nl:8080/api/v1/product/add',
        newProduct
      );
  }

  fetchAllProducts() {
    return this.http
      .get<Product[]>(
        'http://bayoucountry.nl:8080/api/v1/product'
      );
  }

  fetchProductById(id: number) {
    return this.http
      .get<Product>(
        'http://bayoucountry.nl:8080/api/v1/product/' + id
      );
  }

  updateProduct(productDto: ProductDto) {
    return this.http
      .post(
        'http://bayoucountry.nl:8080/api/v1/product/update',
        productDto
      )
  }

  deleteProduct(productId: number) {
    return this.http
      .delete(
        'http://bayoucountry.nl:8080/api/v1/product/' + productId
      );
  }
}

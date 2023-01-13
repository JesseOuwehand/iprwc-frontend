import {Component, Input} from '@angular/core';
import {Product} from "../../models/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input()
  product: Product;

  constructor(private router: Router) {}

  navigateToProduct() {
    this.router.navigate(['/product', this.product.id ])
  }
}

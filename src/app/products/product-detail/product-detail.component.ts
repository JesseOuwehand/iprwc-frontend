import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CartItemDto} from "../../dto/cart-item.dto";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message.model";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isLoading: boolean = false;
  isLoadingButton: boolean = false;
  product: Product;
  quantities: Array<number> = [];
  quantity: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.isLoading = true;
          this.productService.fetchProductById(params['id'])
            .subscribe(product => {
              this.product = product;
              this.quantities = Array(product.inventory).fill(0).map((x,i) => i+1);
              if (this.quantities.length !== 0) {
                this.quantity = this.quantities[0]
              }
              this.isLoading = false;
            })
        }
      )
  }

  addToCart() {
    this.isLoadingButton = true;
    const cartItemDto = new CartItemDto(this.product.id, Number(this.quantity));
    this.shoppingCartService.addItemToCart(cartItemDto).subscribe(() => {
      const message = new Message(
        'Success',
        'Item Added to cart!'
      )
      this.messageService.toggleToast(
        message
      );
      this.isLoadingButton = false;
    }, () => {
      const message = new Message(
        'Error',
        'Something went wrong!'
      )
      this.messageService.toggleToast(
        message
      )
      this.isLoadingButton = false;
    })
  }
}

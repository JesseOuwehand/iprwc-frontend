import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {CartItem} from "../../models/cart-item.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Array<CartItem> = [];
  totalPrice: number = 0;
  isLoading: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.isLoading = true;
    this.shoppingCartService.fetchShoppingCart().subscribe(
      response => {
        this.cartItems = response.cartItems;
        for (let cartItem of response.cartItems) {
          this.totalPrice += (cartItem.quantity * cartItem.product.price);
        }
        this.totalPrice = Number(this.totalPrice.toFixed(2));
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }
    )
  }

  closeCart() {
    this.shoppingCartService.toggleModal();
  }
}

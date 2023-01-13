import {Component, Input} from '@angular/core';
import {CartItem} from "../../../models/cart-item.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @ Input()
  cartItem: CartItem;

  constructor(private shoppingCartService: ShoppingCartService) {}

  deleteFromCart() {
    this.shoppingCartService.deleteFromCart(this.cartItem).subscribe()
  }
}

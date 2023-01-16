import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../../models/cart-item.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @ Input()
  cartItem: CartItem;

  @Output()
  deleteItemFromCartItems: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor(private shoppingCartService: ShoppingCartService, private messageService: MessageService) {}

  deleteFromCart() {
    this.shoppingCartService.deleteFromCart(this.cartItem).subscribe(() => {
      this.deleteItemFromCartItems.emit(this.cartItem);
    }, () => {
      const message = new Message(
        'Error',
        'Something went wrong!'
      )
      this.messageService.toggleToast(
        message
      );
    })
  }
}

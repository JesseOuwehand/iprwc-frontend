import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {CartItem} from "../../models/cart-item.model";
import {Message} from "../../models/message.model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Array<CartItem> = [];
  totalPrice: number = 0;
  isLoading: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService, private messageService: MessageService) {}

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
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoading = false;
      }
    )
  }

  deleteFromCart(cartItem: CartItem) {
    for(let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i] === cartItem) {
        this.cartItems.splice(i, 1);
      }
    }
    this.totalPrice = 0;
    for (let cartItem of this.cartItems) {
      this.totalPrice += (cartItem.quantity * cartItem.product.price);
    }
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  closeCart() {
    this.shoppingCartService.toggleModal();
  }
}

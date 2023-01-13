import {CartItem} from "./cart-item.model";

export class ShoppingCart {
  public id: number;
  public createdAt: Date;
  public cartItems: Array<CartItem>;

  constructor(id: number, createdAt: Date, cartItems: Array<CartItem>) {
    this.id = id;
    this.createdAt = createdAt;
    this.cartItems = cartItems;
  }
}

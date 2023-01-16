import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CartItemDto} from "../dto/cart-item.dto";
import {HttpClient} from "@angular/common/http";
import {ShoppingCart} from "../models/shopping-cart.model";
import {CartItem} from "../models/cart-item.model";

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

  modal = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  toggleModal() {
    this.modal.next(!this.modal.value);
  }

  addItemToCart(cartItemDto: CartItemDto) {
    return this.http
      .post('https://bayoucountry.nl:8080/api/v1/cart/add', cartItemDto);
  }

  fetchShoppingCart() {
    return this.http
      .get<ShoppingCart>('https://bayoucountry.nl:8080/api/v1/cart');
  }

  deleteFromCart(cartItem: CartItem) {
    return this.http
      .delete(
        'https://bayoucountry.nl:8080/api/v1/cart/' + cartItem.id
      );
  }
}

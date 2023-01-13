import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NBAstore-front';
  private shoppingCartSubscription: Subscription;
  shoppingCartModal: boolean = false;

  constructor(private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
    this.shoppingCartSubscription = this.shoppingCartService.modal.subscribe(value => {
      this.shoppingCartModal = value;
    })
  }

  ngOnDestroy() {
    this.shoppingCartSubscription.unsubscribe();
  }
}

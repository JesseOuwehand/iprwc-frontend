import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {Subscription} from "rxjs";
import {MessageService} from "./services/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NBAstore-front';
  private shoppingCartSubscription: Subscription;
  private messageSubscription: Subscription;
  shoppingCartModal: boolean = false;
  toastDisplay: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
    this.shoppingCartSubscription = this.shoppingCartService.modal.subscribe(value => {
      this.shoppingCartModal = value;
    });
    this.messageSubscription = this.messageService.toast.subscribe(value => {
      this.toastDisplay = value !== null;
    });
  }

  ngOnDestroy() {
    this.shoppingCartSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }
}

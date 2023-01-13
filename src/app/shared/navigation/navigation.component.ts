import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  private userSubscription: Subscription;
  loggedIn: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.loggedIn = !!user;
      if (user) {
        this.userName = user.firstName ? user.firstName : '';
        this.isAdmin = user.role === 'admin';
      }
    });
    this.categoryService.fetchAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  logout() {
    this.authenticationService.logout();
  }

  openCart() {
    this.shoppingCartService.toggleModal();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

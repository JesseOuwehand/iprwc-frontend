import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { ShoppingCartComponent } from './shared/shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuardService } from "./services/auth-guard.service";
import { CartItemComponent } from './shared/shopping-cart/cart-item/cart-item.component';
import { ToastComponent } from './shared/toast/toast.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'category/add',
    component: CategoryAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category/update/:id',
    component: CategoryAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent
  },
  {
    path: 'product/add',
    component: ProductAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product/update/:id',
    component: ProductAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryItemComponent,
    LoginComponent,
    RegisterComponent,
    CategoryDetailComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CategoryAddComponent,
    ProductAddComponent,
    ShoppingCartComponent,
    AdminPanelComponent,
    CartItemComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

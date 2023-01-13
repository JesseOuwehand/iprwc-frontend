import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginCredentials} from "../../models/login-credentials.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const credentials = new LoginCredentials(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );

    this.authenticationService.Login(credentials).subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      () => {
        this.isLoading = false;
      });
  }
}

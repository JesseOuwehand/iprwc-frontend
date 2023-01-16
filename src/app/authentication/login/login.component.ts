import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginCredentials} from "../../models/login-credentials.model";
import {Router} from "@angular/router";
import {Message} from "../../models/message.model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService
              ) {}

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
      () => {
        const message = new Message(
          'Success',
          'Welcome back!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoading = false;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registerForm.get('password').value === this.registerForm.get('password2').value) {
      this.isLoading = true;
      const newUser = new User(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
      );

      this.authenticationService.registerUser(newUser).subscribe(() => {
        const message = new Message(
          'Success',
          'Registration successful!'
        )
        this.messageService.toggleToast(
          message
        );
        this.isLoading = false;
        this.router.navigate(['/']);
      }, () => {
        const message = new Message(
          'Error',
          'Something went wrong!'
        )
        this.messageService.toggleToast(
          message
        );
      });
    }
  }
}

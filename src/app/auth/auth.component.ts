import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error!: string;
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    // Extra security, just in case...
    if (!this.form.valid) return;

    this.isLoading = true;
    const email = (<AbstractControl>this.form.get('email')).value;
    const password = (<AbstractControl>this.form.get('password')).value;

    let obs: Observable<AuthResponseData>;

    this.isLoginMode
      ? (obs = this.authService.login(email, password))
      : (obs = this.authService.signUp(email, password));

    obs.subscribe({
      next: (resp) => {
        // console.log(resp);
        this.isLoading = false;
        this.router.navigate(['/jobs']);
      },
      error: (error) => {
        // console.log(error);
        this.isLoading = false;
        this.error = error;
      },
    });
    this.form.reset();
  }

  onHandleError() {
    this.error = '';
  }
}

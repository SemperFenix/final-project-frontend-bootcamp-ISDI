import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/types/login';

import { LoginService } from '../services/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  newLoginForm: FormGroup;

  login: string;
  constructor(
    private loginService: LoginService,
    public formBuilder: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) {
    this.login = 'logout';

    this.newLoginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    const loginUser: Login = {
      email: this.newLoginForm.value.email,
      password: this.newLoginForm.value.password,
    };

    this.loginService.login(loginUser).subscribe((data) => {
      if (!data) return;
      this.loginService.token$.next(data);

      this.newLoginForm.reset();

      this.zone.run(() => {
        this.router.navigateByUrl('/my-profile');
      });
    });
  }
}

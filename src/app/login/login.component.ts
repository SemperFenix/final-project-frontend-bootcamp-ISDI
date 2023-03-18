import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoggedUser, Login } from 'src/types/login';
import { AikidoUsersService } from '../services/aikido.users.service';
import { LoginService } from '../services/login.service';
import * as jose from 'jose';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnDestroy {
  newLoginForm: FormGroup;
  token: string;
  token$: Subscription;
  login: string;
  constructor(
    private aikidoUsersService: AikidoUsersService,
    private loginService: LoginService,
    public formBuilder: FormBuilder
  ) {
    this.login = 'logout';
    this.token = '';
    this.token$ = new Subscription();

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

    this.token$ = this.aikidoUsersService.login(loginUser).subscribe((data) => {
      if (!data) return;
      this.aikidoUsersService.token$.next(data.results[0].token);
      this.token = data.results[0].token;
      localStorage.setItem('Token', this.token);

      const userInfo = jose.decodeJwt(this.token) as unknown as LoggedUser;
      this.newLoginForm.reset();

      this.loginService.loggedUser(userInfo);
    });
  }

  ngOnDestroy(): void {
    this.token$.unsubscribe();
  }
}

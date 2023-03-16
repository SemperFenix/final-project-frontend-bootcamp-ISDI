import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Login } from 'src/types/login';
import { AikidoUsersService } from '../services/aikido.users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnDestroy {
  newLoginForm: FormGroup;
  token: string;
  token$: Subscription;
  constructor(
    public aikidoUsersService: AikidoUsersService,
    public formBuilder: FormBuilder
  ) {
    this.token = '';
    this.token$ = new Subscription();

    this.newLoginForm = formBuilder.group({
      name: ['Nombre', [Validators.required]],
      lastName: ['Apellidos', [Validators.required]],
      age: 'Edad',
      timePracticing: 'Tiempo practicando',
      email: ['E-mail', [Validators.required]],
      password: ['Contraseña', [Validators.required]],
    });
  }

  handleSubmit() {
    const loginUser: Login = {
      email: this.newLoginForm.value.email,
      password: this.newLoginForm.value.password,
    };

    this.token$ = this.aikidoUsersService.login(loginUser).subscribe((data) => {
      this.aikidoUsersService.token$.next(data.results[0].token);
      this.token = data.results[0].token;
    });
  }

  ngOnDestroy(): void {
    this.token$.unsubscribe();
  }
}

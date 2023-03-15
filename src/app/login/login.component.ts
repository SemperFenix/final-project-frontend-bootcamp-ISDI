import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/types/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  newLoginForm: FormGroup;
  @Output() itAdd: EventEmitter<Login>;
  constructor(public formBuilder: FormBuilder) {
    this.itAdd = new EventEmitter();
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
    const newAikidoUser: Login = {
      email: this.newLoginForm.value.email,
      password: this.newLoginForm.value.password,
    };
    this.itAdd.next(newAikidoUser);
    this.newLoginForm.reset();
  }
}

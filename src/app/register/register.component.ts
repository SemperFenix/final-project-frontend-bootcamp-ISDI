import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ProtoAikidoUser } from 'src/types/aikido.user';

import { AikidoUsersService } from '../services/aikido.users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  newRegisterForm: FormGroup;
  fetching: boolean;

  constructor(
    private aikidoUsersService: AikidoUsersService,
    public formBuilder: FormBuilder
  ) {
    this.fetching = false;
    this.newRegisterForm = formBuilder.group({
      name: ['Nombre', [Validators.required]],
      lastName: ['Apellidos', [Validators.required]],
      age: 'Edad',
      timePracticing: 'Tiempo practicando',
      email: ['E-mail', [Validators.required]],
      password: ['Contraseña', [Validators.required]],
    });
  }

  handleSubmit() {
    const newAikidoUser: ProtoAikidoUser = {
      name: this.newRegisterForm.value.name,
      lastName: this.newRegisterForm.value.lastName,
      age: this.newRegisterForm.value.age,
      timePracticing: this.newRegisterForm.value.timePracticing,
      email: this.newRegisterForm.value.email,
      password: this.newRegisterForm.value.password,
      grade: '6º kyu',
    };
    this.aikidoUsersService.register(newAikidoUser).pipe(first()).subscribe();
    this.newRegisterForm.reset();
  }
}

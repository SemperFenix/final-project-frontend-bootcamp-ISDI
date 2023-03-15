import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtoAikidoUser } from 'src/types/aikido.user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  newRegisterForm: FormGroup;
  @Output() itAdd: EventEmitter<ProtoAikidoUser>;
  constructor(public formBuilder: FormBuilder) {
    this.itAdd = new EventEmitter();
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
    this.itAdd.next(newAikidoUser);
    this.newRegisterForm.reset();
  }
}

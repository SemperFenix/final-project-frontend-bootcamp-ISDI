import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { ProtoAikidoUser } from 'src/types/aikido.user';

import { AikidoUsersService } from '../services/aikido.users.service';
import { ModalHandlerService } from '../services/modal-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  newRegisterForm: FormGroup;
  fetching: boolean;
  registerModal: boolean;
  subscription: Subscription;

  constructor(
    private aikidoUsersService: AikidoUsersService,
    private handleModalService: ModalHandlerService,
    public formBuilder: FormBuilder
  ) {
    this.subscription = this.handleModalService
      .getRegisterModal()
      .subscribe((value) => {
        this.registerModal = value;
      });
    this.registerModal = false;
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
    this.handleModalService.registerModal(true);
    this.newRegisterForm.reset();
  }
}

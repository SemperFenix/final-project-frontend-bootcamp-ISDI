import { Component } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { ProtoAikidoUser, UserForm } from 'src/types/aikido.user';

import { AikidoUsersService } from '../services/aikido.users.service';
import { ModalHandlerService } from '../services/modal-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser: UserForm;
  registerModal: boolean;
  subscription: Subscription;

  constructor(
    private aikidoUsersService: AikidoUsersService,
    private handleModalService: ModalHandlerService
  ) {
    this.newUser = {
      email: '',
      name: '',
      lastName: '',
      age: '',
      timePracticing: '',
      password: 'AddPassword',
    };

    this.subscription = this.handleModalService
      .getRegisterModal()
      .subscribe((value) => {
        this.registerModal = value;
      });
    this.registerModal = false;
  }

  async handleSubmit(user: ProtoAikidoUser): Promise<void> {
    this.aikidoUsersService.register(user).pipe(first()).subscribe();
    this.handleModalService.registerModal(true);
  }
}

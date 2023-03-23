import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { ProtoAikidoUser } from 'src/types/aikido.user';

import { AikidoUsersService } from '../services/aikido.users.service';
import { ModalHandlerService } from '../services/modal-handler.service';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newRegisterForm: FormGroup;
  fetching: boolean;
  registerModal: boolean;
  subscription: Subscription;
  private storage: Storage;

  constructor(
    private aikidoUsersService: AikidoUsersService,
    private handleModalService: ModalHandlerService,
    public formBuilder: FormBuilder
  ) {
    this.storage = inject(Storage);
    this.subscription = this.handleModalService
      .getRegisterModal()
      .subscribe((value) => {
        this.registerModal = value;
      });
    this.registerModal = false;
    this.fetching = false;
    this.newRegisterForm = formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: '',
      timePracticing: '',
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadImage(event: any) {
    const file: File = event.target.files[0];
    const imgRef = ref(
      this.storage,
      `avatars/${this.newRegisterForm.value.email}`
    );

    await uploadBytes(imgRef, file);
  }

  async handleSubmit() {
    const avatarRef = ref(
      this.storage,
      `avatars/${this.newRegisterForm.value.email}`
    );

    const avatar = await getDownloadURL(avatarRef);

    const newAikidoUser: ProtoAikidoUser = {
      name: this.newRegisterForm.value.name,
      lastName: this.newRegisterForm.value.lastName,
      age: this.newRegisterForm.value.age
        ? this.newRegisterForm.value.age
        : 'Es un misterio...',
      timePracticing: this.newRegisterForm.value.timePracticing
        ? this.newRegisterForm.value.timePracticing
        : 'N/C',
      email: this.newRegisterForm.value.email,
      password: this.newRegisterForm.value.password,
      avatar: avatar,
      grade: '6º kyu',
    };
    this.aikidoUsersService.register(newAikidoUser).pipe(first()).subscribe();
    this.handleModalService.registerModal(true);
    this.newRegisterForm.reset();
  }
}

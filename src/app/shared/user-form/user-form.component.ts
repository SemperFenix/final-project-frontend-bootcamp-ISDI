import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProtoAikidoUser, UserForm } from 'src/types/aikido.user';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from '@angular/fire/storage';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() userData!: UserForm;
  @Output() itSubmit = new EventEmitter<ProtoAikidoUser>();
  userDataForm!: FormGroup;
  private storage: Storage;
  private avatarImg: File;

  constructor(public formBuilder: FormBuilder) {
    this.avatarImg = new File([], '');
    this.storage = inject(Storage);
  }

  ngOnInit(): void {
    this.userDataForm = this.formBuilder.group({
      name: [this.userData.name, [Validators.required]],
      lastName: [this.userData.lastName, [Validators.required]],
      age: this.userData.age,
      timePracticing: this.userData.timePracticing,
      email: [this.userData.email, [Validators.required]],
      password: ['', [Validators.required]],
    });
    if (!this.userData.password) this.toggleEdit();
  }

  private toggleEdit() {
    const fieldset = document.querySelector('fieldset') as HTMLFieldSetElement;
    fieldset.disabled = !fieldset.disabled;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveImage(event: any) {
    this.avatarImg = event.target.files[0];
  }

  async uploadImage(storage: StorageReference, avatar: File): Promise<void> {
    await uploadBytes(storage, avatar);
  }

  async getImage(storage: StorageReference): Promise<string> {
    const avatar = await getDownloadURL(storage);
    return avatar;
  }

  async sendToParent() {
    let avatar = '';

    if (this.avatarImg.name) {
      const avatarRef = ref(
        this.storage,
        `avatars/${this.userDataForm.value.email}`
      );

      await this.uploadImage(avatarRef, this.avatarImg);

      avatar = await this.getImage(avatarRef);
    }

    const aikidoUser: ProtoAikidoUser = {
      name: this.userDataForm.value.name,
      lastName: this.userDataForm.value.lastName,
      age: this.userDataForm.value.age
        ? this.userDataForm.value.age
        : 'Es un misterio...',
      timePracticing: this.userDataForm.value.timePracticing
        ? this.userDataForm.value.timePracticing
        : 'N/C',
      email: this.userDataForm.value.email,
      password: this.userDataForm.value.password,
      avatar: avatar,
      grade: '6º kyu',
    };

    this.itSubmit.emit(aikidoUser);
  }
}

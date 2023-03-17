import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  public subjectRegister: BehaviorSubject<boolean>;

  constructor() {
    this.subjectRegister = new BehaviorSubject<boolean>(false);
  }

  registerModal(value: boolean) {
    this.subjectRegister.next(value);
  }

  getRegisterModal() {
    return this.subjectRegister.asObservable();
  }
}

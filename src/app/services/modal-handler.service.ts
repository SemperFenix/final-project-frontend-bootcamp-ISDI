import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  public subjectRegister: BehaviorSubject<boolean>;

  constructor() {
    this.subjectRegister = new BehaviorSubject<boolean>(false);
  }

  registerModal(value: boolean): void {
    this.subjectRegister.next(value);
  }

  getRegisterModal(): Observable<boolean> {
    return this.subjectRegister.asObservable();
  }
}

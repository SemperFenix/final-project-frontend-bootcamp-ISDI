import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  public registerModal: BehaviorSubject<boolean>;
  public errorModal: BehaviorSubject<boolean>;

  constructor() {
    this.registerModal = new BehaviorSubject<boolean>(false);
    this.errorModal = new BehaviorSubject<boolean>(false);
  }

  setRegisterModal(value: boolean): void {
    this.registerModal.next(value);
  }

  getRegisterModal(): Observable<boolean> {
    return this.registerModal.asObservable();
  }

  setErrorModal(value: boolean) {
    this.errorModal.next(value);
  }

  getErrorModal(): Observable<boolean> {
    return this.errorModal.asObservable();
  }
}

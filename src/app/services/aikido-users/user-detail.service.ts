import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  userToDetail$: BehaviorSubject<AikidoUser>;
  constructor() {
    this.userToDetail$ = new BehaviorSubject<AikidoUser>({} as AikidoUser);
  }
}

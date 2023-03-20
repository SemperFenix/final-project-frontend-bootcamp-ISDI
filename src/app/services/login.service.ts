import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedUser } from 'src/types/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userLogged$: BehaviorSubject<LoggedUser>;
  constructor() {
    this.userLogged$ = new BehaviorSubject<LoggedUser>({
      id: '',
      email: '',
      role: 'logout',
    } as LoggedUser);
  }

  getLoggedUser(): Observable<LoggedUser> {
    return this.userLogged$;
  }

  loggedUser(pUserLogged: LoggedUser): void {
    this.userLogged$.next(pUserLogged);
  }
}

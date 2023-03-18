import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoggedUser } from 'src/types/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userLogged: LoggedUser;
  private userLogged$: Subject<LoggedUser>;
  constructor() {
    this.userLogged = { email: '', id: '', role: 'logout' };
    this.userLogged$ = new Subject<LoggedUser>();
  }

  loggedUser(pUserLogged: LoggedUser): void {
    this.userLogged = pUserLogged;
    this.userLogged$.next(this.userLogged);
  }

  getLoggedUser$(): Observable<LoggedUser> {
    return this.userLogged$.asObservable();
  }
}

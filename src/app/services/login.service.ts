import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private login: string;
  private login$: Subject<string>;
  constructor() {
    this.login = '';
    this.login$ = new Subject<string>();
  }

  changeLogin(pLogin: string) {
    this.login = pLogin;
    this.login$.next(this.login);
  }

  getLogin$(): Observable<string> {
    return this.login$.asObservable();
  }
}

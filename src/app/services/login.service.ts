import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoggedUser, Login } from 'src/types/login';
import { ServerLoginResponse } from 'src/types/server.responses';
import * as jose from 'jose';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiBaseUrl: string;
  token$: BehaviorSubject<string>;

  userLogged$: BehaviorSubject<LoggedUser>;
  constructor(public http: HttpClient) {
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
    this.token$ = new BehaviorSubject<string>('');

    this.userLogged$ = new BehaviorSubject<LoggedUser>({
      id: '',
      email: '',
      role: 'logout',
    } as LoggedUser);
  }

  login(login: Login): Observable<string> {
    return (
      this.http.post(this.apiBaseUrl + '/login', {
        user: login,
      }) as Observable<ServerLoginResponse>
    ).pipe(
      map((data) => {
        const token = data.results[0].token;
        localStorage.setItem('Token', token);
        const userInfo = jose.decodeJwt(token) as unknown as LoggedUser;
        this.userLogged$.next(userInfo);
        return token;
      })
    );
  }
}

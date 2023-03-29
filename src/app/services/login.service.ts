import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { LoggedUser, Login } from 'src/types/login';
import {
  ServerCompleteUserResponse,
  ServerLoginResponse,
} from 'src/types/server.responses';
import * as jose from 'jose';
import { AikidoUser } from 'src/types/aikido.user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiBaseUrl: string;
  token$: BehaviorSubject<string>;
  currentUser$: BehaviorSubject<AikidoUser>;
  userLogged$: BehaviorSubject<LoggedUser>;

  constructor(public http: HttpClient) {
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
    this.token$ = new BehaviorSubject<string>('');
    this.currentUser$ = new BehaviorSubject<AikidoUser>({} as AikidoUser);
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
        this.token$.next(token);
        localStorage.setItem('Token', token);
        const userInfo = jose.decodeJwt(token) as unknown as LoggedUser;
        this.userLogged$.next(userInfo);
        return token;
      })
    );
  }

  initialToken(): void {
    let token = localStorage.getItem('Token');
    if (!token) {
      token = '';
      this.token$.next(token);

      return;
    }
    this.token$.next(token);
    const userInfo = jose.decodeJwt(token) as unknown as LoggedUser;
    this.userLogged$.next(userInfo);
    this.getCurrentUser(this.userLogged$.value.id).pipe(first()).subscribe();
  }

  getCurrentUser(pUserId: string): Observable<AikidoUser> {
    return (
      this.http.get(this.apiBaseUrl + '/users/' + pUserId, {
        headers: {
          ['Authorization']: `Bearer ${this.token$.value}`,
        },
        responseType: 'json',
      }) as Observable<ServerCompleteUserResponse>
    ).pipe(
      map((data) => {
        this.currentUser$.next(data.results[0]);
        return data.results[0];
      })
    );
  }
}

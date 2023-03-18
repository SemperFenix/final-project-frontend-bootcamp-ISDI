import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/types/login';
import { ServerLoginResponse } from 'src/types/server.responses';

@Injectable({
  providedIn: 'root',
})
export class AikidoUsersService {
  fetching: BehaviorSubject<boolean>;
  apiBaseUrl: string;
  token: string | null;
  token$: BehaviorSubject<string>;

  constructor(public http: HttpClient) {
    this.token = '';
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
    this.fetching = new BehaviorSubject<boolean>(false);
    this.token$ = new BehaviorSubject<string>('');
  }

  register(user: ProtoAikidoUser): Observable<AikidoUser> {
    return this.http.post(
      this.apiBaseUrl + '/register',
      user
    ) as Observable<AikidoUser>;
  }

  login(login: Login): Observable<ServerLoginResponse> {
    return this.http.post(
      this.apiBaseUrl + '/login',
      login
    ) as Observable<ServerLoginResponse>;
  }

  getUsers(): Observable<UsersList> {
    this.token$.value
      ? (this.token = this.token$.value)
      : (this.token = localStorage.getItem('Token'));
    return this.http.get(this.apiBaseUrl + '/users', {
      headers: { ['Authorization']: 'Bearer ' + this.token$ },
      responseType: 'json',
    }) as Observable<UsersList>;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser } from 'src/types/aikido.user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/types/login';
import { ServerLoginResponse } from 'src/types/server.response';

@Injectable({
  providedIn: 'root',
})
export class AikidoUsersService {
  fetching: BehaviorSubject<boolean>;
  apiBaseUrl: string;
  token$: BehaviorSubject<string>;

  constructor(public http: HttpClient) {
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
}

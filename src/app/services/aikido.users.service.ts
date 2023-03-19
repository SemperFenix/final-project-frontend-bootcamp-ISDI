import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Login } from 'src/types/login';
import {
  ServerLoginResponse,
  ServerUsersResponse,
} from 'src/types/server.responses';

@Injectable({
  providedIn: 'root',
})
export class AikidoUsersService {
  fetching: BehaviorSubject<boolean>;
  apiBaseUrl: string;
  token: string | null;
  token$: BehaviorSubject<string>;
  senseis: UsersList;
  senseis$: Subject<UsersList>;
  students: UsersList;
  students$: Subject<UsersList>;

  constructor(public http: HttpClient) {
    this.senseis = { users: [], number: 0 };
    this.senseis$ = new Subject<UsersList>();
    this.students = { users: [], number: 0 };
    this.students$ = new Subject<UsersList>();
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

  getSenseiUsers(pPage: string): Observable<ServerUsersResponse> {
    // eslint-disable-next-line no-debugger
    // debugger;
    this.token$.value
      ? (this.token = this.token$.value)
      : (this.token = localStorage.getItem('Token'));
    return this.http.get(this.apiBaseUrl + '/users/senseis', {
      headers: { ['Authorization']: `Bearer ${this.token}` },
      params: new HttpParams().set('page', pPage),
      responseType: 'json',
    }) as Observable<ServerUsersResponse>;
  }

  senseiUsers(pSenseis: UsersList): void {
    this.senseis = pSenseis;
    this.senseis$.next(this.senseis);
  }

  getStudentUsers(pPage: string): Observable<ServerUsersResponse> {
    this.token$.value
      ? (this.token = this.token$.value)
      : (this.token = localStorage.getItem('Token'));
    return this.http.get(this.apiBaseUrl + '/users/students', {
      headers: { ['Authorization']: `Bearer ${this.token}` },
      params: new HttpParams().set('page', pPage),
      responseType: 'json',
    }) as Observable<ServerUsersResponse>;
  }

  studentUsers(pStudents: UsersList): void {
    this.students = pStudents;
    this.students$.next(this.students);
  }
}

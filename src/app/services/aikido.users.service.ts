import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from 'src/types/login';
import {
  ServerCompleteUserResponse,
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
  senseis$: BehaviorSubject<UsersList>;
  students$: BehaviorSubject<UsersList>;
  currentUser$: BehaviorSubject<AikidoUser>;

  constructor(public http: HttpClient) {
    this.currentUser$ = new BehaviorSubject<AikidoUser>({} as AikidoUser);
    this.senseis$ = new BehaviorSubject<UsersList>({ users: [], number: 0 });
    this.students$ = new BehaviorSubject<UsersList>({ users: [], number: 0 });
    this.token = '';
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
    this.fetching = new BehaviorSubject<boolean>(false);
    this.token$ = new BehaviorSubject<string>('');
  }

  register(user: ProtoAikidoUser): Observable<AikidoUser> {
    return this.http.post(this.apiBaseUrl + '/register', {
      user: user,
    }) as Observable<AikidoUser>;
  }

  login(login: Login): Observable<string> {
    return (
      this.http.post(this.apiBaseUrl + '/login', {
        user: login,
      }) as Observable<ServerLoginResponse>
    ).pipe(map((data) => data.results[0].token));
  }

  getSenseiUsers(pPage: string): Observable<UsersList> {
    this.token = this.token$.value;
    if (this.token === '') this.token = localStorage.getItem('Token');
    return (
      this.http.get(this.apiBaseUrl + '/users/list/:sensei', {
        headers: { ['Authorization']: `Bearer ${this.token}` },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerUsersResponse>
    ).pipe(
      map((data) => {
        this.senseiUsers(data.results[0]);
        return data.results[0];
      })
    );
  }

  senseiUsers(pSenseis: UsersList): void {
    this.senseis$.next(pSenseis);
  }

  getStudentUsers(pPage: string): Observable<UsersList> {
    this.token = this.token$.value;
    if (this.token === '') this.token = localStorage.getItem('Token');

    const observ = (
      this.http.get(this.apiBaseUrl + '/users/list/:user', {
        headers: { ['Authorization']: `Bearer ${this.token}` },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerUsersResponse>
    ).pipe(
      map((data) => {
        this.studentUsers(data.results[0]);
        return data.results[0];
      })
    );

    return observ;
  }

  studentUsers(pStudents: UsersList): void {
    this.students$.next(pStudents);
  }

  getCurrentUser(pUserId: string): Observable<AikidoUser> {
    this.token = this.token$.value;
    if (this.token === '') this.token = localStorage.getItem('Token');
    return (
      this.http.get(this.apiBaseUrl + '/users/' + pUserId, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
        responseType: 'json',
      }) as Observable<ServerCompleteUserResponse>
    ).pipe(
      map((data) => {
        this.storeCurrentUser(data.results[0]);
        return data.results[0];
      })
    );
  }

  storeCurrentUser(pCurrent: AikidoUser): void {
    this.currentUser$.next(pCurrent);
  }
}

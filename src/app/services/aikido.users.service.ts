import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser, UsersList } from 'src/types/aikido.user';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ServerUsersResponse } from 'src/types/server.responses';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AikidoUsersService {
  apiBaseUrl: string;
  senseis$: BehaviorSubject<UsersList>;
  students$: BehaviorSubject<UsersList>;
  currentUser$: BehaviorSubject<AikidoUser>;

  constructor(public http: HttpClient, private loginService: LoginService) {
    this.currentUser$ = new BehaviorSubject<AikidoUser>({} as AikidoUser);
    this.senseis$ = new BehaviorSubject<UsersList>({ users: [], number: 0 });
    this.students$ = new BehaviorSubject<UsersList>({ users: [], number: 0 });
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
  }

  register(user: ProtoAikidoUser): Observable<AikidoUser> {
    return this.http.post(this.apiBaseUrl + '/register', {
      user: user,
    }) as Observable<AikidoUser>;
  }

  getSenseiUsers(pPage: string): Observable<UsersList> {
    return (
      this.http.get(this.apiBaseUrl + '/users/list/:sensei', {
        headers: {
          ['Authorization']: `Bearer ${this.loginService.token$.value}`,
        },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerUsersResponse>
    ).pipe(
      map((data) => {
        this.senseis$.next(data.results[0]);
        return data.results[0];
      })
    );
  }

  getStudentUsers(pPage: string): Observable<UsersList> {
    const observ = (
      this.http.get(this.apiBaseUrl + '/users/list/:user', {
        headers: {
          ['Authorization']: `Bearer ${this.loginService.token$.value}`,
        },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerUsersResponse>
    ).pipe(
      map((data) => {
        this.students$.next(data.results[0]);
        return data.results[0];
      })
    );

    return observ;
  }
}

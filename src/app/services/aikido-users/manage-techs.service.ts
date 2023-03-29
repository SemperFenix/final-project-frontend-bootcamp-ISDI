import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { ServerCompleteUserResponse } from 'src/types/server.responses';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class ManageTechsService {
  apiBaseUrl: string;

  constructor(public http: HttpClient, private loginService: LoginService) {
    this.apiBaseUrl = 'http://localhost:4500/aikido-users';
  }

  addTechToLearn(pTechId: string): Observable<AikidoUser> {
    return (
      this.http.patch(
        `${this.apiBaseUrl}/add-tech/${this.loginService.userLogged$.value.id}`,
        {
          userId: this.loginService.userLogged$.value.id,
          tech: { id: pTechId },
        },
        {
          headers: {
            ['Authorization']: `Bearer ${this.loginService.token$.value}`,
          },
          responseType: 'json',
        }
      ) as Observable<ServerCompleteUserResponse>
    ).pipe(
      map((data) => {
        this.loginService.currentUser$.next(data.results[0]);
        return data.results[0];
      })
    );
  }

  removeTechToLearn(pTechId: string): Observable<AikidoUser> {
    return (
      this.http.patch(
        `${this.apiBaseUrl}/remove-tech/${this.loginService.userLogged$.value.id}`,
        {
          userId: this.loginService.userLogged$.value.id,
          tech: { id: pTechId },
        },
        {
          headers: {
            ['Authorization']: `Bearer ${this.loginService.token$.value}`,
          },
          responseType: 'json',
        }
      ) as Observable<ServerCompleteUserResponse>
    ).pipe(
      map((data) => {
        this.loginService.currentUser$.next(data.results[0]);
        return data.results[0];
      })
    );
  }
}

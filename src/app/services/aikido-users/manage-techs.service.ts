import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { ServerCompleteUserResponse } from 'src/types/server.responses';
import { Tech } from 'src/types/tech';
import { LoginService } from '../login.service';
import { UserDetailService } from './user-detail.service';

@Injectable({
  providedIn: 'root',
})
export class ManageTechsService {
  apiBaseUrl: string;

  constructor(
    public http: HttpClient,
    private loginService: LoginService,
    private userToDetailService: UserDetailService
  ) {
    this.apiBaseUrl = 'https://aikido-journey.onrender.com/aikido-users';
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

  progressTech(
    pUserId: AikidoUser['id'],
    pTechId: Tech['id']
  ): Observable<AikidoUser> {
    return (
      this.http.patch(
        `${this.apiBaseUrl}/update/admin/${this.loginService.userLogged$.value.id}`,
        {
          userId: this.loginService.userLogged$.value.id,
          user: { id: pUserId },
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
        this.userToDetailService.userToDetail$.next(data.results[0]);
        return data.results[0];
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, first, map, Observable, Subscription } from 'rxjs';
import { MyTechsList, Tech, Techniques } from 'src/types/tech';
import { AikidoUsersService } from './aikido.users.service';
import { ServerTechsResponse } from 'src/types/server.responses';

@Injectable({
  providedIn: 'root',
})
export class TechsService {
  techs$: BehaviorSubject<MyTechsList>;
  currentTech$: BehaviorSubject<Tech>;
  apiBaseUrl: string;
  token: string | null;

  constructor(
    public http: HttpClient,
    private aikidoUsersService: AikidoUsersService
  ) {
    this.token = '';
    this.techs$ = new BehaviorSubject<MyTechsList>({} as MyTechsList);
    this.currentTech$ = new BehaviorSubject<Tech>({} as Tech);
    this.apiBaseUrl = 'http://localhost:4500/techniques/';
  }

  getTechsCategorized(
    pPage: string,
    pTech: Techniques
  ): Observable<MyTechsList> {
    this.token = localStorage.getItem('Token');
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWM3Yjg4NzU2YzU0N2UyMWU5MmNkZSIsImVtYWlsIjoic2lsdmlhQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc5NTg4MjM5fQ.0L8Gc0v1ok_19NYygBHY9rLux1vDJwS2dcRQR3iSD7c';
    // // '';
    // if (!this.aikidoUsersService.token$.value) return;
    return (
      this.http.get(this.apiBaseUrl + 'list/:' + pTech.toString(), {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerTechsResponse>
    ).pipe(
      map((data) => {
        this.listTechs({
          [pTech]: {
            techs: data.results[0].techs,
            number: data.results[0].number,
          },
        });
        return this.techs$.value;
      })
    );
  }

  listTechs(pTechs: Partial<MyTechsList>): void {
    this.techs$.next({ ...this.techs$.value, ...pTechs } as MyTechsList);
  }
}

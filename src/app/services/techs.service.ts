import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MyTechsList, Tech, Techniques } from 'src/types/tech';
import { ServerTechsResponse } from 'src/types/server.responses';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TechsService {
  techs$: BehaviorSubject<MyTechsList>;
  currentTech$: BehaviorSubject<Tech>;
  apiBaseUrl: string;

  constructor(public http: HttpClient, private loginService: LoginService) {
    this.techs$ = new BehaviorSubject<MyTechsList>({} as MyTechsList);
    this.currentTech$ = new BehaviorSubject<Tech>({} as Tech);
    this.apiBaseUrl = 'http://localhost:4500/techniques/';
  }

  getTechsCategorized(
    pPage: string,
    pTech: Techniques
  ): Observable<MyTechsList> {
    return (
      this.http.get(this.apiBaseUrl + 'list/:' + pTech.toString(), {
        headers: {
          ['Authorization']: `Bearer ${this.loginService.token$.value}`,
        },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerTechsResponse>
    ).pipe(
      map((data) => {
        this.techs$.next({
          ...this.techs$.value,
          [pTech]: {
            techs: data.results[0].techs,
            number: data.results[0].number,
          },
        });
        return this.techs$.value;
      })
    );
  }
}

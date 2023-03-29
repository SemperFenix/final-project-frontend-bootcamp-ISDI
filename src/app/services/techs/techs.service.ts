import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { TechsList, Tech, Technique } from 'src/types/tech';
import {
  ServerTechsFilteredResponse,
  ServerTechsResponse,
} from 'src/types/server.responses';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class TechsService {
  techs$: BehaviorSubject<TechsList>;
  currentTech$: BehaviorSubject<Tech>;
  apiBaseUrl: string;
  filteredTechs$: BehaviorSubject<Tech[]>;

  constructor(public http: HttpClient, private loginService: LoginService) {
    this.techs$ = new BehaviorSubject<TechsList>({} as TechsList);
    this.filteredTechs$ = new BehaviorSubject<Tech[]>([]);

    this.currentTech$ = new BehaviorSubject<Tech>({} as Tech);
    this.apiBaseUrl = 'https://aikido-journey.onrender.com/techniques/';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => {
      new Error('Ha saltado un error');
    });
  }

  getTechsCategorized(pPage: string, pTech: Technique): Observable<TechsList> {
    return (
      this.http.get(this.apiBaseUrl + 'list/:' + pTech, {
        headers: {
          ['Authorization']: `Bearer ${this.loginService.token$.value}`,
        },
        params: new HttpParams().set('page', pPage),
        responseType: 'json',
      }) as Observable<ServerTechsResponse>
    ).pipe(
      catchError(this.handleError),

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

  getTechsFiltered(pFilterParams: string) {
    return (
      this.http.get(`${this.apiBaseUrl}list/filter`, {
        headers: {
          ['Authorization']: `Bearer ${this.loginService.token$.value}`,
        },
        params: new HttpParams({ fromString: pFilterParams }),
        responseType: 'json',
      }) as Observable<ServerTechsFilteredResponse>
    ).pipe(
      catchError(this.handleError),

      map((data) => {
        this.filteredTechs$.next(data.results[0] as unknown as Tech[]);
        return this.filteredTechs$.value;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AikidoUser, ProtoAikidoUser } from 'src/types/aikido.user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AikidoUsersService {
  apiBaseUrl: string;

  constructor(public http: HttpClient) {
    this.apiBaseUrl = 'https://aikido-journey.onrender.com/aikido-users';
  }

  register(user: ProtoAikidoUser): Observable<{
    user$: AikidoUser;
  }> {
    return this.http.post(this.apiBaseUrl + '/register', user) as Observable<{
      user$: AikidoUser;
    }>;
  }
}

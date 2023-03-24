import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { AikidoUsersService } from '../services/aikido.users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  currentUser$: Observable<AikidoUser>;

  constructor(
    private aikidoUsersService: AikidoUsersService,
    private loginService: LoginService
  ) {
    this.currentUser$ = this.loginService.getCurrentUser(
      this.loginService.userLogged$.value.id
    );
  }
}

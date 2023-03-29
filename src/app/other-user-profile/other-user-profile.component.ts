import { Component } from '@angular/core';
import { first } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { UserDetailService } from '../services/aikido-users/user-detail.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss'],
})
export class OtherUserProfileComponent {
  role: string;

  constructor(
    private userToDetailService: UserDetailService,
    private loginService: LoginService
  ) {
    this.loginService.currentUser$.pipe(first()).subscribe();
    this.role = this.loginService.userLogged$.value.role;
  }
}

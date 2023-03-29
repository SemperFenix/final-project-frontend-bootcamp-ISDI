import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { AikidoUsersService } from '../services/aikido-users/aikido.users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  // userData: UserForm;

  constructor(
    private loginService: LoginService,
    private aikidoUsersService: AikidoUsersService,
    private router: Router,
    private zone: NgZone
  ) {}

  handleEdit() {
    const form = document.querySelector('fieldset') as HTMLFieldSetElement;

    form.disabled = !form.disabled;
  }

  handleUpdate(user: Partial<AikidoUser>) {
    if (!user.avatar) user.avatar = this.loginService.currentUser$.value.avatar;
    delete user.password;
    this.aikidoUsersService.updateSelfUser(user).pipe(first()).subscribe();

    this.handleEdit();
  }

  handleDelete() {
    this.aikidoUsersService.deleteSelfUser().pipe(first()).subscribe();

    localStorage.clear();
    this.loginService.token$.next('');
    this.loginService.userLogged$.next({ email: '', id: '', role: 'logout' });
    this.zone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }
}

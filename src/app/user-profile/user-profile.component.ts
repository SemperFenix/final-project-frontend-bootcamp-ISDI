import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, Subject } from 'rxjs';
import { AikidoUser, UserForm } from 'src/types/aikido.user';
import { AikidoUsersService } from '../services/aikido-users/aikido.users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  currentUser$: Subject<AikidoUser>;
  userData: UserForm;

  constructor(
    private loginService: LoginService,
    private aikidoUsersService: AikidoUsersService,
    private router: Router,
    private zone: NgZone
  ) {
    this.currentUser$ = this.loginService.currentUser$;
    this.userData = {} as UserForm;
  }

  ngOnInit(): void {
    this.loginService.initialToken();

    console.log(this.loginService.currentUser$.value);
    this.loginService.currentUser$.subscribe((data) => {
      let age = 'N/C';
      if (data.age) age = data.age.toString();
      this.userData = {
        name: data.name,
        lastName: data.lastName,
        age: age,
        email: data.email,
        timePracticing: data.timePracticing,
      };
    });
  }

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

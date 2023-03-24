import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoggedUser } from 'src/types/login';
import { MenuItems } from 'src/types/menu.items';
import * as jose from 'jose';
import { AikidoUsersService } from 'src/app/services/aikido.users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItems[];
  itemsLogged: MenuItems[];
  itemsAdmin: MenuItems[];
  loggedUser$: Observable<LoggedUser>;
  token: string | null;

  @Output() burger: EventEmitter<boolean>;
  constructor(
    private loginService: LoginService,
    private aikidoUsersService: AikidoUsersService,
    private router: Router,
    private zone: NgZone
  ) {
    this.burger = new EventEmitter(true);
    this.token = '';
    this.loggedUser$ = this.loginService.userLogged$.asObservable();
    this.items = [
      {
        path: 'register',
        label: 'Register',
      },
      {
        path: 'login',
        label: 'Login',
      },
    ];
    this.itemsLogged = [
      {
        path: 'techs', // Esta es la etiqueta que hayamos puesto en el routing
        label: 'Técnicas', // Nombre a mostrar
      },
      {
        path: 'users',
        label: 'Usuarios',
      },
      {
        path: 'my-profile',
        label: 'Mi perfil',
      },
      {
        path: 'progress',
        label: 'Mi progreso',
      },
      {
        path: 'logout',
        label: 'Cerrar sesión',
      },
    ];
    this.itemsAdmin = [
      {
        path: 'techs', // Esta es la etiqueta que hayamos puesto en el routing
        label: 'Técnicas', // Nombre a mostrar
      },
      {
        path: 'users',
        label: 'Usuarios',
      },
      {
        path: 'my-profile',
        label: 'Mi perfil',
      },
      {
        path: 'add-tech',
        label: 'Añadir',
      },
      {
        path: 'progress',
        label: 'Mi progreso',
      },
      {
        path: 'logout',
        label: 'Cerrar sesión',
      },
    ];
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('Token');

    if (!this.token) return;

    const userInfo = jose.decodeJwt(this.token) as unknown as LoggedUser;

    this.loginService.userLogged$.next(userInfo);
  }

  handleLogout(): void {
    localStorage.clear();

    this.loginService.userLogged$.next({ email: '', id: '', role: 'logout' });
    this.burger.next(!this.burger);

    this.zone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  sendToParent() {
    this.burger.next(!this.burger);
  }
}

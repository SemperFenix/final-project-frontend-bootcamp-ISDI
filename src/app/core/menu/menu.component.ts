import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoggedUser } from 'src/types/login';
import { MenuItems } from 'src/types/menu.items';
import * as jose from 'jose';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItems[];
  itemsLogged: MenuItems[];
  itemsAdmin: MenuItems[];
  loggedUser: LoggedUser;
  token: string | null;
  constructor(private loginService: LoginService) {
    this.token = '';
    this.loggedUser = { email: '', id: '', role: 'logout' };
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
        path: 'profile',
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
        path: 'profile',
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
    this.loginService
      .getLoggedUser$()
      .subscribe((user) => (this.loggedUser = user));
    this.token = localStorage.getItem('Token');

    if (!this.token) return;

    const userInfo = jose.decodeJwt(this.token) as unknown as LoggedUser;

    this.loginService.loggedUser(userInfo);
  }

  handleLogout(): void {
    localStorage.clear();
    this.loginService.loggedUser({ email: '', id: '', role: 'logout' });
  }
}

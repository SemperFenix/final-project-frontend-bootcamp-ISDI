import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoggedUser } from 'src/types/login';
import { MenuItems } from 'src/types/menu.items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent implements OnInit {
  items: MenuItems[];
  itemsLogged: MenuItems[];
  itemsAdmin: MenuItems[];
  loggedUser: LoggedUser;
  constructor(private loginService: LoginService) {
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
  }

  handleLogout(): void {
    localStorage.clear();
    this.loginService.loggedUser({ email: '', id: '', role: 'logout' });
  }
}

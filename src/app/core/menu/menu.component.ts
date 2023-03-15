import { Component } from '@angular/core';
import { MenuItems } from 'src/types/menu.items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  items: MenuItems[];
  constructor() {
    this.items = [
      {
        path: 'home', // Esta es la etiqueta que hayamos puesto en el routing
        label: 'Inicio', // Nombre a mostrar
      },
      {
        path: 'register',
        label: 'Register',
      },
      {
        path: 'login',
        label: 'Login',
      },
    ];
  }
}

import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() burger: boolean;
  constructor(private loginService: LoginService) {
    this.burger = true;
    this.loginService.initialToken();
  }

  burgerOption() {
    this.burger = !this.burger;
  }
  menu() {
    this.burger = !this.burger;
  }
}

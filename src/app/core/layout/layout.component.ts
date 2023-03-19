import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() burger: boolean;
  constructor() {
    this.burger = true;
  }
  burgerOption() {
    this.burger = !this.burger;
  }
  menu() {
    this.burger = !this.burger;
  }
}

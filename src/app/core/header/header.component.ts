import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() burger: boolean;
  @Output() menu = new EventEmitter<boolean>(true);

  constructor() {
    this.burger = true;
  }

  sendToParent() {
    this.menu.next(!this.burger);
  }
}

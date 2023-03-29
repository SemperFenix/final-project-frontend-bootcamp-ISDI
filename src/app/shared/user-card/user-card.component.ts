import { Component, Input } from '@angular/core';
import { AikidoUser } from 'src/types/aikido.user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user!: AikidoUser;
}

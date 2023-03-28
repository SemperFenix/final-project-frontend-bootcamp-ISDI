import { Component, Input } from '@angular/core';
import { Tech } from 'src/types/tech';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
})
export class TechCardComponent {
  @Input() tech!: Tech;
}

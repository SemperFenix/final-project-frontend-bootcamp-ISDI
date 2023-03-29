import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TechDetailsService } from 'src/app/services/techs/tech-details.service';
import { Tech } from 'src/types/tech';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
})
export class TechCardComponent {
  @Input() tech!: Tech;

  constructor(
    private techDetailsService: TechDetailsService,
    private router: Router,
    private zone: NgZone
  ) {}

  saveActualTech(tech: Tech): void {
    this.techDetailsService.currentTech.next(tech);
    this.zone.run(() => {
      this.router.navigateByUrl('/tech/details');
    });
  }
}

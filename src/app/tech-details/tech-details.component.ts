import { Component } from '@angular/core';
import { Tech } from 'src/types/tech';
import { TechDetailsService } from '../services/techs/tech-details.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tech-details',
  templateUrl: './tech-details.component.html',
  styleUrls: ['./tech-details.component.scss'],
})
export class TechDetailsComponent {
  actualTech: Tech;

  constructor(
    private techDetailsService: TechDetailsService,
    private sanitizer: DomSanitizer
  ) {
    this.actualTech = this.techDetailsService.currentTech.value;
  }
}

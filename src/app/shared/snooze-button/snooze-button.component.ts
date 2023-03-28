import { Component, Input } from '@angular/core';
import { first } from 'rxjs';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';
import { Tech } from 'src/types/tech';

@Component({
  selector: 'app-snooze-button',
  templateUrl: './snooze-button.component.html',
  styleUrls: ['./snooze-button.component.scss'],
})
export class SnoozeButtonComponent {
  @Input() techId!: Tech['id'];
  constructor(private manageTechs: ManageTechsService) {}

  handleRemoveTech(pTechId: Tech['id']) {
    console.log(pTechId, this.techId);
    this.manageTechs.removeTechToLearn(pTechId).pipe(first()).subscribe();
  }
}

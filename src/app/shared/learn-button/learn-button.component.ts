import { Component, Input } from '@angular/core';
import { first } from 'rxjs';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';
import { LoginService } from 'src/app/services/login.service';
import { AikidoUser } from 'src/types/aikido.user';
import { Tech } from 'src/types/tech';

@Component({
  selector: 'app-learn-button',
  templateUrl: './learn-button.component.html',
  styleUrls: ['./learn-button.component.scss'],
})
export class LearnButtonComponent {
  @Input() techId!: Tech['id'];
  @Input() user!: AikidoUser;

  constructor(
    private manageTechs: ManageTechsService,
    private loginService: LoginService
  ) {}

  // Comentado para futura implementación
  // ngOnInit(): void {
  //   const button = document.querySelector('button') as HTMLButtonElement;
  //   const userLearnt = this.techsLearnt.map((item) => {
  //     item.id === this.techId;
  //   });
  //   const userInProgress = this.techsInProgress.map((item) => {
  //     item.id === this.techId;
  //   });
  //   if (userLearnt.length !== 0 || userInProgress.length !== 0)
  //     button.disabled = true;
  // }

  handleAddTech(pTechId: Tech['id']) {
    this.manageTechs.addTechToLearn(pTechId).pipe(first()).subscribe();
  }
}

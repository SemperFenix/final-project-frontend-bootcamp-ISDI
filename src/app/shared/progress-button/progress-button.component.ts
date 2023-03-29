import { Component, Input } from '@angular/core';
import { first } from 'rxjs';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';
import { UserDetailService } from 'src/app/services/aikido-users/user-detail.service';
import { LoginService } from 'src/app/services/login.service';
import { Tech } from 'src/types/tech';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss'],
})
export class ProgressButtonComponent {
  @Input() techId!: Tech['id'];

  constructor(
    private manageTechs: ManageTechsService,
    private userDetailService: UserDetailService,
    private loginService: LoginService
  ) {}

  handleProgress(pTechId: Tech['id']) {
    this.manageTechs
      .progressTech(this.userDetailService.userToDetail$.value.id, pTechId)
      .pipe(first())
      .subscribe();
  }
}

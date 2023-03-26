import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersList } from 'src/types/aikido.user';
import { AikidoUsersService } from '../services/aikido.users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  senseis$: Observable<UsersList>;
  students$: Observable<UsersList>;
  senseisPage: number;
  studentsPage: number;

  constructor(private aikidoUsersService: AikidoUsersService) {
    this.senseisPage = 1;
    this.studentsPage = 1;

    this.senseis$ = this.aikidoUsersService.getSenseiUsers(
      String(this.senseisPage)
    );

    this.students$ = this.aikidoUsersService.getStudentUsers(
      String(this.studentsPage)
    );
  }

  handleSenseisPrev = () => {
    if (this.senseisPage <= 1) return;
    this.senseisPage--;
    this.senseis$ = this.aikidoUsersService.getSenseiUsers(
      String(this.senseisPage)
    );
  };
  handleSenseisNext = () => {
    const maxPage = Math.ceil(
      this.aikidoUsersService.senseis$.value.number / 3
    );
    if (this.senseisPage >= maxPage) return;
    this.senseisPage++;
    this.senseis$ = this.aikidoUsersService.getSenseiUsers(
      String(this.senseisPage)
    );
  };

  handleStudentsPrev = () => {
    if (this.studentsPage <= 1) return;
    this.studentsPage--;
    this.students$ = this.aikidoUsersService.getStudentUsers(
      String(this.studentsPage)
    );
  };

  handleStudentsNext = () => {
    const maxPage = Math.ceil(
      this.aikidoUsersService.students$.value.number / 3
    );
    if (this.studentsPage >= maxPage) return;
    this.studentsPage++;
    this.students$ = this.aikidoUsersService.getStudentUsers(
      String(this.studentsPage)
    );
  };
}

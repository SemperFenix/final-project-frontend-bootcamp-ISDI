import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersList } from 'src/types/aikido.user';
import { AikidoUsersService } from '../services/aikido.users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  students: UsersList;
  senseis: UsersList;
  senseis$: Subscription;
  students$: Subscription;
  senseisPage: number;
  studentsPage: number;

  constructor(private aikidoUsersService: AikidoUsersService) {
    this.senseisPage = 1;
    this.studentsPage = 1;
    this.students = {} as UsersList;
    this.senseis = {} as UsersList;
    this.senseis$ = new Subscription();
    this.students$ = new Subscription();
  }

  ngOnInit(): void {
    this.senseis$ = this.aikidoUsersService
      .getSenseiUsers(String(this.senseisPage))
      .subscribe((users) => {
        this.senseis = users.results[0];
        this.aikidoUsersService.senseiUsers(this.senseis);
      });

    this.students$ = this.aikidoUsersService
      .getStudentUsers(String(this.studentsPage))
      .subscribe((users) => {
        this.students = users.results[0];
        this.aikidoUsersService.studentUsers(this.students);
      });
  }

  handleSenseisPrev = () => {
    if (this.senseisPage > 1) this.senseisPage--;
    this.aikidoUsersService
      .getSenseiUsers(String(this.senseisPage))
      .subscribe((users) => {
        this.senseis = users.results[0];
        this.aikidoUsersService.senseiUsers(this.senseis);
      });
  };
  handleSenseisNext = () => {
    const maxPage = Math.floor(this.senseis.number / 3);
    if (this.senseisPage < maxPage) this.senseisPage++;
    this.aikidoUsersService
      .getSenseiUsers(String(this.senseisPage))
      .subscribe((users) => {
        this.senseis = users.results[0];
        this.aikidoUsersService.senseiUsers(this.senseis);
      });
  };

  handleStudentsPrev = () => {
    if (this.studentsPage > 1) this.studentsPage--;
    this.aikidoUsersService
      .getStudentUsers(String(this.studentsPage))
      .subscribe((users) => {
        this.students = users.results[0];
        this.aikidoUsersService.studentUsers(this.students);
      });
  };

  handleStudentsNext = () => {
    const maxPage = Math.floor(this.students.number / 3);
    if (this.studentsPage < maxPage) this.studentsPage++;
    this.aikidoUsersService
      .getStudentUsers(String(this.studentsPage))
      .subscribe((users) => {
        this.students = users.results[0];
        this.aikidoUsersService.studentUsers(this.students);
      });
  };

  ngOnDestroy(): void {
    this.senseis$.unsubscribe();
    this.students$.unsubscribe();
  }
}

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { AikidoUsersService } from '../services/aikido.users.service';
import {
  mockAikidoUsersService,
  mockSenseisList,
  mockUsersList,
} from '../utils/mocks/test.mocks';

import { UsersListComponent } from './users-list.component';

describe('Given the UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: AikidoUsersService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [HttpClientTestingModule, FontawesomeIconsModule],
      providers: [
        {
          provide: AikidoUsersService,
          useValue: mockAikidoUsersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AikidoUsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When call the handleSenseisPrev', () => {
    describe('And the actual page is bigger than 1', () => {
      it('Then it should call the getSenseiUsers with inferior page', () => {
        const spySenseis = spyOn(service, 'getSenseiUsers').and.returnValue(
          of(mockSenseisList)
        );
        component.senseisPage = 3;
        component.handleSenseisPrev();

        expect(spySenseis).toHaveBeenCalledWith('2');
      });
    });

    describe('And the actual page is 1', () => {
      it('Then it should not call the getSenseiUsers with page 1', () => {
        const spySenseis = spyOn(service, 'getSenseiUsers').and.returnValue(
          of(mockSenseisList)
        );
        component.senseisPage = 1;
        component.handleSenseisPrev();

        expect(spySenseis).not.toHaveBeenCalledWith('1');
      });
    });
  });

  describe('When call the handleSenseisNext', () => {
    describe('And the actual page is equal to max page', () => {
      it('Then it should not call the getSenseiUsers', () => {
        const spySenseis = spyOn(service, 'getSenseiUsers').and.returnValue(
          of(mockSenseisList)
        );
        component.senseisPage = 3;
        service.senseis$.value.number = 9;
        component.handleSenseisNext();

        expect(spySenseis).not.toHaveBeenCalledWith('3');
      });
    });

    describe('And the actual page is lesser to the max Page', () => {
      it('Then it should call the getSenseiUsers with page 1', () => {
        const spySenseis = spyOn(service, 'getSenseiUsers').and.returnValue(
          of(mockSenseisList)
        );
        component.senseisPage = 1;
        service.senseis$.value.number = 9;
        component.handleSenseisNext();

        expect(spySenseis).toHaveBeenCalledWith('2');
      });
    });
  });

  describe('When call the handleStudentsPrev', () => {
    describe('And the actual page is bigger than 1', () => {
      it('Then it should call the getStudentUsers with inferior page', () => {
        const spyStudents = spyOn(service, 'getStudentUsers').and.returnValue(
          of(mockUsersList)
        );
        component.studentsPage = 3;
        component.handleStudentsPrev();

        expect(spyStudents).toHaveBeenCalledWith('2');
      });
    });

    describe('And the actual page is 1', () => {
      it('Then it should not call the getStudentUsers', () => {
        const spyStudents = spyOn(service, 'getStudentUsers').and.returnValue(
          of(mockUsersList)
        );
        component.studentsPage = 1;
        component.handleStudentsPrev();

        expect(spyStudents).not.toHaveBeenCalledWith('1');
      });
    });
  });

  describe('When call the handleStudentsNext', () => {
    describe('And the actual page is equal to max page', () => {
      it('Then it should not call the getStudentUsers ', () => {
        const spyStudents = spyOn(service, 'getStudentUsers').and.returnValue(
          of(mockUsersList)
        );
        component.studentsPage = 3;
        service.students$.value.number = 9;
        component.handleStudentsNext();

        expect(spyStudents).not.toHaveBeenCalledWith('3');
      });
    });

    describe('And the actual page is lesser to the max Page', () => {
      it('Then it should call the getStudentUsers with page 2', () => {
        const spyStudents = spyOn(service, 'getStudentUsers').and.returnValue(
          of(mockUsersList)
        );

        component.studentsPage = 1;
        component.handleStudentsNext();

        expect(spyStudents).toHaveBeenCalledWith('2');
      });
    });
  });
});

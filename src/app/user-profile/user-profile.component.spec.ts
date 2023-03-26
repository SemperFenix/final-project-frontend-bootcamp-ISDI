import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AikidoUser } from 'src/types/aikido.user';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { LoginComponent } from '../login/login.component';
import { AikidoUsersService } from '../services/aikido.users.service';
import { LoginService } from '../services/login.service';
import { SharedModule } from '../shared/shared.module';
import {
  mockAikidoUsersService,
  mockLoginService,
} from '../utils/mocks/test.mocks';

import { UserProfileComponent } from './user-profile.component';

describe('Given the UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let loginService: LoginService;
  let usersService: AikidoUsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        HttpClientTestingModule,
        FontawesomeIconsModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: AikidoUsersService, useValue: mockAikidoUsersService },
      ],
    }).compileComponents();

    loginService = TestBed.inject(LoginService);
    usersService = TestBed.inject(AikidoUsersService);
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When onInit', () => {
    it('Then it should update userData value', () => {
      component.currentUser$ = of({
        name: 'TestName',
        lastName: 'TestLast',
        age: 32,
        email: 'TestMail',
        timePracticing: '',
      } as unknown as AikidoUser);

      component.ngOnInit();

      expect(component.userData).toEqual({
        name: 'TestName',
        lastName: 'TestLast',
        age: '32',
        email: 'TestMail',
        timePracticing: '',
      });
    });
  });

  describe('When call handleEdit', () => {
    it('Then it should toggle the value of form.disabled', () => {
      const fieldset = document.querySelector(
        'fieldset'
      ) as HTMLFieldSetElement;

      expect(fieldset.disabled).toBeTrue();
      component.handleEdit();
      expect(fieldset.disabled).toBeFalse();
    });
  });

  describe('When call handleUpdate', () => {
    it('Then it should call usersService.updateSelfUser', () => {
      const spyUpdate = spyOn(usersService, 'updateSelfUser').and.callThrough();
      component.handleUpdate({});
      expect(spyUpdate).toHaveBeenCalled();
    });
  });

  describe('When call handleDelete', () => {
    it('Then it should call usersService.deleteSelfUser, and update userLoggedData', () => {
      const spyDelete = spyOn(usersService, 'deleteSelfUser').and.callThrough();
      const spyLocal = spyOn(localStorage, 'clear').and.callThrough();
      const spyLoginToken = spyOn(
        loginService.token$,
        'next'
      ).and.callThrough();
      const spyLoginUserLogged = spyOn(
        loginService.userLogged$,
        'next'
      ).and.callThrough();

      component.handleDelete();

      expect(spyDelete).toHaveBeenCalled();
      expect(spyLocal).toHaveBeenCalled();
      expect(spyLoginToken).toHaveBeenCalled();
      expect(spyLoginUserLogged).toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AikidoUsersService } from '../services/aikido.users.service';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {
  mockAikidoUsersService,
  mockToken,
} from 'src/app/utils/mocks/test.mocks';
import { ServerLoginResponse } from 'src/types/server.responses';

const serverResp = {
  results: [
    {
      token: mockToken,
    },
  ],
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AikidoUsersService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        {
          provide: AikidoUsersService,
          useValue: mockAikidoUsersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AikidoUsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Given the handleSubmit method', () => {
    describe('When called with correct data', () => {
      it('Should call the aikidoUsers login service and next', () => {
        component.newLoginForm.value['email'] = 'TestMail';
        component.newLoginForm.value['password'] = 'TestPass';

        const spyLogin = spyOn(service, 'login').and.returnValue(
          of(serverResp)
        );

        component.handleSubmit();

        expect(spyLogin).toHaveBeenCalled();
      });
    });

    describe('When called with incorrect data', () => {
      it('Should call the aikidoUsers login service and return', () => {
        const spyLogin = spyOn(service, 'login').and.returnValue(
          of(undefined as unknown as ServerLoginResponse)
        );
        const spyLocal = spyOn(localStorage, 'setItem');

        component.handleSubmit();

        expect(spyLogin).toHaveBeenCalled();
        expect(spyLocal).not.toHaveBeenCalled();
      });
    });
  });
});

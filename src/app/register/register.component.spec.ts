/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  mockAikidoUser,
  mockAikidoUsersService,
} from 'src/app/utils/mocks/test.mocks';
import { AikidoUsersService } from '../services/aikido.users.service';
import { RegisterComponent } from './register.component';

import { SharedModule } from '../shared/shared.module';
import { ModalHandlerService } from '../services/modal-handler.service';

describe('Given the RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AikidoUsersService;
  let modalService: ModalHandlerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
      ],
      providers: [
        ModalHandlerService,
        {
          provide: AikidoUsersService,
          useValue: mockAikidoUsersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AikidoUsersService);
    modalService = TestBed.inject(ModalHandlerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When the handleSubmit method is called', () => {
    describe('And there is no avatarImg.name', () => {
      it('Then it should call service.register', () => {
        const spyRegister = spyOn(service, 'register').and.returnValue(
          of(mockAikidoUser)
        );

        const spyModal = spyOn(modalService, 'registerModal').and.callThrough();

        component.handleSubmit(mockAikidoUser);

        expect(spyRegister).toHaveBeenCalled();
        expect(spyModal).toHaveBeenCalledWith(true);
      });
    });

    describe('And there is no age nor time practicing', () => {
      it('Then it should call service.register', () => {
        const spyRegister = spyOn(service, 'register').and.returnValue(
          of(mockAikidoUser)
        );

        component.handleSubmit(mockAikidoUser);

        expect(spyRegister).toHaveBeenCalled();
      });
    });
  });
});

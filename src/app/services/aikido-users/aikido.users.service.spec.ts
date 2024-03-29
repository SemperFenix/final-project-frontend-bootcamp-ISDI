import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  mockAikidoUser,
  mockLoginService,
  mockProtoAikidoUser,
  mockSenseisList,
  mockUsersList,
} from '../../../app/utils/mocks/test.mocks';
import {
  ServerCompleteUserResponse,
  ServerUsersResponse,
} from '../../../types/server.responses';

import { AikidoUsersService } from './aikido.users.service';
import { LoginService } from '../login.service';
import { AikidoUser } from 'src/types/aikido.user';

describe('Given the AikidoUsersService', () => {
  let aikidoService: AikidoUsersService;
  let loginService: LoginService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    });
    aikidoService = TestBed.inject(AikidoUsersService);
    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(aikidoService).toBeTruthy();
  });

  describe('When the register method is called', () => {
    it('Then it should return the complete registered user', async () => {
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      aikidoService.register(mockProtoAikidoUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockResp));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'https://aikido-journey.onrender.com/aikido-users/register'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockResp);
    });
  });

  describe('When the getSenseiUsers method is called', () => {
    describe('And there is no token$', () => {
      it('should return the senseis list from API', async () => {
        const mockResp: ServerUsersResponse = {
          results: [mockSenseisList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${loginService.token$.value}`,
        });
        aikidoService.getSenseiUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSenseisList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'https://aikido-journey.onrender.com/aikido-users/users/list/:sensei?page=1'
        );
        req.flush(mockResp);

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is a token$', () => {
      it('should return the senseis list from API', async () => {
        loginService.token$.next('TestToken');
        const mockResp: ServerUsersResponse = {
          results: [mockSenseisList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${loginService.token$.value}`,
        });
        aikidoService.getSenseiUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSenseisList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'https://aikido-journey.onrender.com/aikido-users/users/list/:sensei?page=1'
        );
        req.flush(mockResp);

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });

  describe('When the getStudentUsers method is called', () => {
    describe('And there is a token$', () => {
      it('should return the students list from API', async () => {
        loginService.token$.next('TestToken');
        const mockResp: ServerUsersResponse = {
          results: [mockUsersList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${loginService.token$}`,
        });
        aikidoService.getStudentUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockUsersList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'https://aikido-journey.onrender.com/aikido-users/users/list/:user?page=1'
        );
        req.flush(mockResp);

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is no token$', () => {
      it('should return the students list from API', async () => {
        loginService.token$.next('');
        const mockResp: ServerUsersResponse = {
          results: [mockUsersList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${loginService.token$.value}`,
        });
        aikidoService.getStudentUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockUsersList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'https://aikido-journey.onrender.com/aikido-users/users/list/:user?page=1'
        );
        req.flush(mockResp);

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });

  describe('When the updateSelfUser method is called', () => {
    it('Then it should return the updated user', () => {
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      loginService.currentUser$.next({
        id: 'TestId',
      } as unknown as AikidoUser);

      const spyLogin = spyOn(
        loginService.currentUser$,
        'next'
      ).and.callThrough();
      aikidoService.updateSelfUser(mockProtoAikidoUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(spyLogin).toHaveBeenCalled();

        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'https://aikido-journey.onrender.com/aikido-users/update/TestId'
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockResp);
    });
  });

  describe('When the deleteSelfUser method is called', () => {
    it('Then it should return void object', () => {
      loginService.token$.next('TestToken');
      const mockResp = {
        results: [{}],
      };
      loginService.currentUser$.next({
        id: 'TestId',
      } as unknown as AikidoUser);
      aikidoService.deleteSelfUser().subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockResp));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'https://aikido-journey.onrender.com/aikido-users/delete/TestId'
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockResp);
    });
  });
});

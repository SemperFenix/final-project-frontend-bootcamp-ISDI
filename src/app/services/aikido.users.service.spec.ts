import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
  mockAikidoUser,
  mockProtoAikidoUser,
  mockSenseisList,
  mockUsersList,
} from 'src/app/utils/mocks/test.mocks';
import { Login } from 'src/types/login';
import {
  ServerLoginResponse,
  ServerCompleteUserResponse,
  ServerUsersResponse,
} from 'src/types/server.responses';

import { AikidoUsersService } from './aikido.users.service';

describe('AikidoUsersService', () => {
  let service: AikidoUsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AikidoUsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the register method is called', () => {
    it('should return the complete registered user', async () => {
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      service.register(mockProtoAikidoUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockResp));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/register'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockResp);
    });
  });

  describe('When the login method is called', () => {
    it('Then it should return the token', () => {
      const mockResp: ServerLoginResponse = {
        results: [{ token: 'TestToken' }],
      };
      const mockLogin: Login = {
        email: 'TestMail',
        password: 'TestPass',
      };

      service.login(mockLogin).subscribe((data) => {
        expect(data).not.toBeNull();
        expect(data).toBe('TestToken');
      });
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/login'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockResp);
    });
  });

  describe('When the getSenseiUsers method is called', () => {
    describe('And there is no token$', () => {
      it('should return the senseis list from API', async () => {
        service.token$ = new BehaviorSubject('');
        const spyLocal = spyOn(localStorage, 'getItem').and.returnValue('a');
        const mockResp: ServerUsersResponse = {
          results: [mockSenseisList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getSenseiUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSenseisList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/list/:sensei?page=1'
        );
        req.flush(mockResp);

        expect(spyLocal).toHaveBeenCalled();
        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is a token$', () => {
      it('should return the senseis list from API', async () => {
        service.token$ = new BehaviorSubject('a');
        const spyLocal = spyOn(localStorage, 'getItem').and.callThrough();
        const mockResp: ServerUsersResponse = {
          results: [mockSenseisList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getSenseiUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSenseisList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/list/:sensei?page=1'
        );
        req.flush(mockResp);

        expect(spyLocal).not.toHaveBeenCalled();
        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });

  describe('When the senseiUsers method is called', () => {
    it('should return the senseis list', async () => {
      service.senseiUsers(mockSenseisList);

      expect(httpTestingController).toBeTruthy();

      expect(service.senseis$.value).toEqual(mockSenseisList);
    });
  });

  describe('When the getStudentUsers method is called', () => {
    describe('And there is a token$', () => {
      it('should return the students list from API', async () => {
        service.token$ = new BehaviorSubject('a');
        const spyLocal = spyOn(localStorage, 'getItem').and.callThrough();
        const mockResp: ServerUsersResponse = {
          results: [mockUsersList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getStudentUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockUsersList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/list/:user?page=1'
        );
        req.flush(mockResp);
        expect(spyLocal).not.toHaveBeenCalled();

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is no token$', () => {
      it('should return the students list from API', async () => {
        service.token$ = new BehaviorSubject('');
        const spyLocal = spyOn(localStorage, 'getItem').and.returnValue('a');
        const mockResp: ServerUsersResponse = {
          results: [mockUsersList],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getStudentUsers('1').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockUsersList));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/list/:user?page=1'
        );
        req.flush(mockResp);

        expect(spyLocal).toHaveBeenCalled();
        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });

  describe('When the studentUsers method is called', () => {
    it('should return the students list', async () => {
      service.studentUsers(mockUsersList);

      expect(httpTestingController).toBeTruthy();

      expect(service.students$.value).toEqual(mockUsersList);
    });
  });

  describe('When the getCurrentUser method is called', () => {
    describe('And there is no token$', () => {
      it('should return the user from API', async () => {
        service.token$ = new BehaviorSubject('');
        const spyLocal = spyOn(localStorage, 'getItem').and.returnValue('a');
        const mockResp: ServerCompleteUserResponse = {
          results: [mockAikidoUser],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getCurrentUser('12345').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/12345'
        );
        req.flush(mockResp);

        expect(spyLocal).toHaveBeenCalled();
        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is a token$', () => {
      it('should return the user from API', async () => {
        service.token$ = new BehaviorSubject('a');
        const spyLocal = spyOn(localStorage, 'getItem').and.callThrough();
        const mockResp: ServerCompleteUserResponse = {
          results: [mockAikidoUser],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token}`,
        });
        service.getCurrentUser('12345').subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
        });
        expect(httpTestingController).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:4500/aikido-users/users/12345'
        );
        req.flush(mockResp);

        expect(spyLocal).not.toHaveBeenCalled();
        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });
});

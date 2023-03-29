import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Login } from 'src/types/login';
import {
  ServerCompleteUserResponse,
  ServerLoginResponse,
} from 'src/types/server.responses';
import { mockAikidoUser, mockToken } from '../utils/mocks/test.mocks';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the login method is called', () => {
    it('Then it should return the token', () => {
      const mockResp: ServerLoginResponse = {
        results: [{ token: mockToken }],
      };
      const mockLogin: Login = {
        email: 'TestMail',
        password: 'TestPass',
      };

      const spyLocal = spyOn(localStorage, 'setItem').and.callThrough();
      const spyNext = spyOn(service.token$, 'next').and.callThrough();

      service.login(mockLogin).subscribe((data) => {
        expect(data).not.toBeNull();
        expect(data).toBe(mockToken);
        expect(spyLocal).toHaveBeenCalled();
        expect(spyNext).toHaveBeenCalled();
      });
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/login'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockResp);
    });
  });

  describe('When initialToken method is called', () => {
    describe('And there is a token in localStorage', () => {
      it('Then it should call this.token$.next with retrieved value', () => {
        const spyNext = spyOn(service.token$, 'next').and.callThrough();
        const spyLocal = spyOn(localStorage, 'getItem').and.returnValue(
          mockToken
        );

        service.initialToken();
        expect(spyLocal).toHaveBeenCalled();
        expect(spyNext).toHaveBeenCalledWith(mockToken);
      });
    });

    describe('And there is no token in LocalStorage', () => {
      it('Then it should change this.token$.next with empty string and return', () => {
        const spyNext = spyOn(service.token$, 'next').and.callThrough();
        const spyLocal = spyOn(localStorage, 'getItem').and.returnValue('');

        service.initialToken();
        expect(spyLocal).toHaveBeenCalled();
        expect(spyNext).toHaveBeenCalledWith('');
      });
    });
  });

  describe('When the getCurrentUser method is called', () => {
    describe('And there is no token$', () => {
      it('should return the user from API', async () => {
        service.token$.next('');
        const mockResp: ServerCompleteUserResponse = {
          results: [mockAikidoUser],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token$.value}`,
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

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });

    describe('And there is a token$', () => {
      it('should return the user from API', async () => {
        service.token$.next('TestToken');
        const mockResp: ServerCompleteUserResponse = {
          results: [mockAikidoUser],
        };
        const header = new HttpHeaders({
          ['Authorization']: `Bearer ${service.token$.value}`,
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

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toBe(
          JSON.stringify(header)
        );
      });
    });
  });
});

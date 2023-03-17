import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  mockAikidoUser,
  mockProtoAikidoUser,
} from 'src/app/utils/mocks/test.mocks';
import { Login } from 'src/types/login';
import {
  ServerLoginResponse,
  ServerRegisterResponse,
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
      const mockResp: ServerRegisterResponse = {
        results: [mockAikidoUser],
      };
      service.register(mockProtoAikidoUser).subscribe((resp) => {
        console.log(resp);
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
        console.log(data);
        expect(data).not.toBeNull();
        expect(JSON.stringify(data)).toBe(JSON.stringify(mockResp));
      });
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/login'
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockResp);
    });
  });
});

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProtoAikidoUser } from 'src/types/aikido.user';
import { Login } from 'src/types/login';
import {
  ServerLoginResponse,
  ServerRegisterResponse,
} from 'src/types/server.responses';

import { AikidoUsersService } from './aikido.users.service';

describe('AikidoUsersService', () => {
  let service: AikidoUsersService;
  let httpTestingController: HttpTestingController;

  const newAikidoUser: ProtoAikidoUser = {
    name: 'TestName',
    lastName: 'TestLast',
    email: 'TestMail',
    grade: '6º kyu',
    password: 'TestPass',
  };

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
    it('should return the complete registered user', () => {
      const mockResp: ServerRegisterResponse = {
        results: [
          {
            ...newAikidoUser,
            techsLearnt: [],
            techsInProgress: [],
            role: 'user',
            id: '1',
            techToReview: '',
          },
        ],
      };
      service.register(newAikidoUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockResp));
      });
      expect(httpTestingController).toBeTruthy();
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
        expect(JSON.stringify(data)).toBe(JSON.stringify(mockResp));
      });
    });
  });
});

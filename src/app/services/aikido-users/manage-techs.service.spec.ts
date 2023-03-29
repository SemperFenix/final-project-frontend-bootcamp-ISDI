import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  mockAikidoUser,
  mockLoginService,
} from '../../../app/utils/mocks/test.mocks';
import { AikidoUser } from '../../../types/aikido.user';
import { ServerCompleteUserResponse } from '../../../types/server.responses';
import { LoginService } from '../login.service';

import { ManageTechsService } from './manage-techs.service';

describe('ManageTechsService', () => {
  let service: ManageTechsService;
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
    service = TestBed.inject(ManageTechsService);
    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When addTechToLearn method is called', () => {
    it('Then it should return the user', () => {
      loginService.userLogged$.next({ id: 'TestId' } as unknown as AikidoUser);
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      service.addTechToLearn('TestId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/add-tech/TestId'
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockResp);
    });
  });

  describe('When removeTechToLearn method is called', () => {
    it('Then it should return the user', () => {
      loginService.userLogged$.next({
        id: 'TestId',
      } as unknown as AikidoUser);
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      service.removeTechToLearn('TestId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/remove-tech/TestId'
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockResp);
    });
  });

  describe('When progressTech method is called', () => {
    it('Then it should return the updated user', () => {
      loginService.userLogged$.next({
        id: 'TestId',
      } as unknown as AikidoUser);
      const mockResp: ServerCompleteUserResponse = {
        results: [mockAikidoUser],
      };
      service.progressTech('UserId', 'TechId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockAikidoUser));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/aikido-users/update/admin/TestId'
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(mockResp);
    });
  });
});

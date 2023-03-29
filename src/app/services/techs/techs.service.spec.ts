import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ServerTechsFilteredResponse,
  ServerTechsResponse,
} from 'src/types/server.responses';
import {
  mockLoginService,
  mockTech,
  mockTechsList,
} from '../../utils/mocks/test.mocks';
import { LoginService } from '../login.service';

import { TechsService } from './techs.service';

describe('Given the TechsService', () => {
  let service: TechsService;
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  let header: HttpHeaders;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LoginService, useValue: mockLoginService }],
    });
    service = TestBed.inject(TechsService);
    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    header = new HttpHeaders({
      ['Authorization']: `Bearer ${loginService.token$.value}`,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the getTechsCategorized method is called', () => {
    it('should return the techs$ value updated with techs retrieved', async () => {
      loginService.token$.next('TestToken');
      const mockResp: ServerTechsResponse = {
        results: [mockTechsList],
      };

      service.getTechsCategorized('1', 'Gokyo').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(
          JSON.stringify({
            Gokyo: {
              techs: mockTechsList.techs,
              number: mockTechsList.number,
            },
          })
        );
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/techniques/list/:Gokyo?page=1'
      );
      req.flush(mockResp);

      expect(req.request.method).toEqual('GET');
      expect(JSON.stringify(req.request.headers)).toBe(JSON.stringify(header));
    });
  });

  describe('When getTechsFiltered method is called', () => {
    it('Then it should return the techs from API', () => {
      const mockResp: ServerTechsFilteredResponse = {
        results: [[mockTech]],
      };
      service.getTechsFiltered('tech=Gokyo').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify([mockTech]));
      });
      expect(httpTestingController).toBeTruthy();
      const req = httpTestingController.expectOne(
        'http://localhost:4500/techniques/list/filter?tech=Gokyo'
      );
      req.flush(mockResp);

      expect(req.request.method).toEqual('GET');
      expect(JSON.stringify(req.request.headers)).toBe(JSON.stringify(header));
    });
  });

  describe('When handleError method is called', () => {
    describe('And error is instance of Error', () => {
      it('Then it should call  throw error', () => {
        const spyConsole = spyOn(console, 'error').and.callThrough();

        const error = new HttpErrorResponse({
          error: { message: 'Ha saltado un error', status: 404 },

          status: 404,
        });

        service['handleError'](error).subscribe({
          next: () => {
            console.log('ok');
          },
          error: () => {
            expect(error.message).toBe(
              'Http failure response for (unknown url): 404 undefined'
            );
            expect(spyConsole).toHaveBeenCalled();
          },
        });
      });
    });

    describe('And error is not instance of Error', () => {
      it('Then it should call console.error and throw error', () => {
        const spyConsole = spyOn(console, 'error').and.callThrough();

        const error = new HttpErrorResponse({
          error: new ErrorEvent('Error'),
        });

        service['handleError'](error);
        expect(spyConsole).toHaveBeenCalled();
      });
    });
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AikidoUsersService } from './aikido.users.service';

describe('AikidoUsersService', () => {
  let service: AikidoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AikidoUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

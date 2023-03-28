import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ManageTechsService } from './manage-techs.service';

describe('ManageTechsService', () => {
  let service: ManageTechsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ManageTechsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

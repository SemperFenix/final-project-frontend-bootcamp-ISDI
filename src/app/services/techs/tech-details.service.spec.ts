import { TestBed } from '@angular/core/testing';

import { TechDetailsService } from './tech-details.service';

describe('TechDetailsService', () => {
  let service: TechDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

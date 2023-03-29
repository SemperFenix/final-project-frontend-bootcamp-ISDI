import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafePipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize an unsafe URL', () => {
    const unsafeUrl = 'javascript:alert("hello")';
    const safeUrl = pipe.transform(unsafeUrl);
    expect(safeUrl).toBeDefined();
  });

  it('should return null for empty input', () => {
    const emptyUrl = '';
    const safeUrl = pipe.transform(emptyUrl);
    expect(safeUrl).toBeNull();
  });
});

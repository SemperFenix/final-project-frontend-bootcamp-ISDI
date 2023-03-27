import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ErrorModalComponent } from './error-modal.component';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorModalComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When call the close modal method', () => {
    it('call the registerModal service', () => {
      const spy = spyOn(
        component.modalService.errorModal,
        'next'
      ).and.callThrough();
      component.closeModal();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });
});

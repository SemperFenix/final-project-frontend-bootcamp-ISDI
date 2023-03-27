import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterModalComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When call the close modal method', () => {
    it('call the registerModal service', () => {
      const spy = spyOn(
        component.modalService.registerModal,
        'next'
      ).and.callThrough();
      component.closeModal();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });
});

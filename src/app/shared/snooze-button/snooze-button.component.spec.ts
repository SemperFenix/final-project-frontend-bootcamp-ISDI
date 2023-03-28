import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnoozeButtonComponent } from './snooze-button.component';

describe('SnoozeButtonComponent', () => {
  let component: SnoozeButtonComponent;
  let fixture: ComponentFixture<SnoozeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnoozeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnoozeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

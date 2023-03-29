import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';

import { TechDetailsComponent } from './tech-details.component';

describe('TechDetailsComponent', () => {
  let component: TechDetailsComponent;
  let fixture: ComponentFixture<TechDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechDetailsComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TechDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

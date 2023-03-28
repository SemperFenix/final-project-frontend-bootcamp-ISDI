import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tech } from 'src/types/tech';

import { TechCardComponent } from './tech-card.component';

describe('TechCardComponent', () => {
  let component: TechCardComponent;
  let fixture: ComponentFixture<TechCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechCardComponent);
    component = fixture.componentInstance;
    component.tech = {
      id: 'TestId',
      attack: 'Shomen-uchi',
      tech: 'Gokyo',
      stand: 'Tachi-waza',
      grade: '1º DAN',
    } as Tech;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TechDetailsService } from 'src/app/services/techs/tech-details.service';
import { Tech } from 'src/types/tech';

import { TechCardComponent } from './tech-card.component';

describe('TechCardComponent', () => {
  let component: TechCardComponent;
  let fixture: ComponentFixture<TechCardComponent>;
  let service: TechDetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechCardComponent],
      providers: [TechDetailsService, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TechCardComponent);
    service = TestBed.inject(TechDetailsService);
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

  describe('When call the saveActualTech method', () => {
    it('Then it should call techDetailService', () => {
      const spyTech = spyOn(service.currentTech, 'next').and.callThrough();
      component.saveActualTech({} as Tech);
      expect(spyTech).toHaveBeenCalled();
    });
  });
});

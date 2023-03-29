import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';

import { LearnButtonComponent } from './learn-button.component';

describe('LearnButtonComponent', () => {
  let component: LearnButtonComponent;
  let fixture: ComponentFixture<LearnButtonComponent>;
  let manageTechsService: ManageTechsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnButtonComponent],
      imports: [HttpClientTestingModule],
      providers: [ManageTechsService],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnButtonComponent);
    component = fixture.componentInstance;
    manageTechsService = TestBed.inject(ManageTechsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When handleAddTech method is called', () => {
    it('Then it should call loginService and manageTechsService', () => {
      const spyTechs = spyOn(
        manageTechsService,
        'addTechToLearn'
      ).and.callThrough();

      component.handleAddTech('TestId');
      expect(spyTechs).toHaveBeenCalled();
    });
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';

import { SnoozeButtonComponent } from './snooze-button.component';

describe('SnoozeButtonComponent', () => {
  let component: SnoozeButtonComponent;
  let fixture: ComponentFixture<SnoozeButtonComponent>;
  let manageTechsService: ManageTechsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnoozeButtonComponent],
      imports: [HttpClientTestingModule],
      providers: [ManageTechsService],
    }).compileComponents();

    fixture = TestBed.createComponent(SnoozeButtonComponent);
    manageTechsService = TestBed.inject(ManageTechsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When handleRemoveTech is called', () => {
    it('Then it should manageTechsService', () => {
      const spyTechs = spyOn(
        manageTechsService,
        'removeTechToLearn'
      ).and.callThrough();
      component.handleRemoveTech('TestId');
      expect(spyTechs).toHaveBeenCalled();
    });
  });
});

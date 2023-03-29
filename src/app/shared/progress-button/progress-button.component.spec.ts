import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTechsService } from 'src/app/services/aikido-users/manage-techs.service';

import { ProgressButtonComponent } from './progress-button.component';

describe('ProgressButtonComponent', () => {
  let component: ProgressButtonComponent;
  let fixture: ComponentFixture<ProgressButtonComponent>;
  let service: ManageTechsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressButtonComponent],
      imports: [HttpClientTestingModule],
      providers: [ManageTechsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressButtonComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ManageTechsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When handleProgress method is called', () => {
    it('Then it should call manageTechs.progressTech', () => {
      const spyManage = spyOn(service, 'progressTech').and.callThrough();
      component.handleProgress('TestId');
      expect(spyManage).toHaveBeenCalled();
    });
  });
});

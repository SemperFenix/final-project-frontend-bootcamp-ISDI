import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MyTechsList, TechPages, techsListed } from 'src/types/tech';
import { TechsService } from '../services/techs.service';
import { mockTechsService } from '../utils/mocks/test.mocks';

import { TechsListComponent } from './techs-list.component';

describe('TechsListComponent', () => {
  let component: TechsListComponent;
  let fixture: ComponentFixture<TechsListComponent>;
  let techsService: TechsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechsListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: TechsService, useValue: mockTechsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TechsListComponent);
    component = fixture.componentInstance;
    techsService = TestBed.inject(TechsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize properties correctly', () => {
  //   const mockTechsList: MyTechsList = {
  //     Ikkyo: { number: 1, techs: [] },
  //   } as unknown as MyTechsList;
  //   const mockTechPages = {
  //     Ikkyo: { page: 1, exists: false },
  //   } as unknown as TechPages;
  //   const spyTechs = spyOn(techsService, 'getTechsCategorized').and.returnValue(
  //     of({} as MyTechsList)
  //   );
  //   const techPageMock = techsListed.map((item) => ({
  //     [item]: { page: 1, exists: false },
  //   })) as unknown as TechPages[];
  //   expect(component.techPage).toEqual(techPageMock);
  //   expect(component.techPages).toEqual(mockTechPages);
  //   expect(component.techs).toEqual({} as MyTechsList);

  //   fixture.detectChanges();
  //   expect(spyTechs).toHaveBeenCalled();

  //   // expect(mockTechsService.getTechsCategorized.calls.count()).toBe(1);
  //   // expect(mockTechsService.getTechsCategorized).toHaveBeenCalledWith(
  //   //   '1',
  //   //   'angular'
  //   // );
  //   expect(component.techs).toEqual(mockTechsList);
  // });

  it('should handle next page', () => {
    const tech = 'Ikkyo';
    const spy = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of({ Ikkyo: { techs: [], number: 0 } } as unknown as MyTechsList)
    );
    // const spyValue = spyOn(techsService.techs$, 'value')
    component.techPages['Ikkyo'].page = 1;
    component.handleNext('Ikkyo');
    expect(spy).toHaveBeenCalledWith('2', tech);
  });

  it('should handle previous page', () => {
    const tech = 'Ikkyo';
    const spy = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of({ [tech]: { techs: [], number: 0 } } as unknown as MyTechsList)
    );
    component.handlePrev(tech);
    expect(spy).toHaveBeenCalledWith('1', tech);
  });
});

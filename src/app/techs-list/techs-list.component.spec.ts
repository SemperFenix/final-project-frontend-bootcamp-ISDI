import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechsListComponent } from './techs-list.component';
import { TechsService } from '../services/techs.service';
import { of } from 'rxjs';
import { MyTechsList, TechPages, Tech } from 'src/types/tech';
import { mockTechsService } from '../utils/mocks/test.mocks';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';

describe('TechsListComponent', () => {
  let component: TechsListComponent;
  let fixture: ComponentFixture<TechsListComponent>;
  let techsService: TechsService;
  // Este valor viene del mockTechsService, ya que component.techs inicializa con el valor del observable
  const mockGetCatReturn = {
    Ikkyo: { techs: [], number: 6 },
    Nikkyo: { techs: [{}], number: 6 },
    Sankyo: { techs: [], number: 6 },
  } as unknown as MyTechsList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechsListComponent],
      imports: [FontawesomeIconsModule],
      providers: [{ provide: TechsService, useValue: mockTechsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TechsListComponent);
    techsService = TestBed.inject(TechsService);
    component = fixture.componentInstance;
    component.techsToSearch = ['Ikkyo', 'Nikkyo', 'Sankyo'];
    component.techPages = {
      Ikkyo: { page: 5, exists: false },
      Nikkyo: { page: 2, exists: false },
      Sankyo: { page: 2, exists: false },
    } as TechPages;

    fixture.detectChanges();
  });

  describe('When created an instance', () => {
    // Test del constructor
    it('Then it should initialize techs, tech pages and techsToSearch', () => {
      expect(component.techs).toBeDefined();
      expect(component.techPages).toBeDefined();
      expect(component.techsToSearch.length).toBe(3);
    });
  });

  describe('When onInit', () => {
    it('Then should update the value of techPages, call service method and update techs', () => {
      const spyGet = spyOn(
        techsService,
        'getTechsCategorized'
      ).and.callThrough();
      component.ngOnInit();

      expect(Object.keys(component.techPages).length).toBe(3);
      expect(spyGet).toHaveBeenCalledTimes(3);
      expect(component.techs).toEqual(mockGetCatReturn);
    });
  });

  describe('When call the checkExistence method', () => {
    it('Then it should change exists to true if tech property techs lenght is greater than 0', () => {
      component.techPages = {
        Ikkyo: { page: 5, exists: false },
        Nikkyo: { page: 2, exists: false },
      } as TechPages;
      component['checkExistence']([{} as Tech], 'Ikkyo');
      expect(component.techPages.Ikkyo.exists).toBeTrue();
    });
  });

  describe('When call the handleNext method', () => {
    describe('And there is a next page', () => {
      it('Then it should call de service method with next page', () => {
        const mockTechs = {
          Ikkyo: { techs: ['Next'], number: 6 },
        } as unknown as MyTechsList;
        const spyGet = spyOn(
          techsService,
          'getTechsCategorized'
        ).and.returnValue(of(mockTechs));
        component.techPages.Ikkyo.page = 1;

        component.handleNext('Ikkyo');
        expect(component.techPages.Ikkyo.page).toBe(2);
        expect(spyGet).toHaveBeenCalledWith('2', 'Ikkyo');
        expect(component.techs).toEqual({
          Ikkyo: { techs: ['Next'], number: 6 },
          Nikkyo: { techs: [{}], number: 6 },
          Sankyo: { techs: [], number: 6 },
        } as unknown as MyTechsList);
      });
    });

    describe('And it is already in maxPage', () => {
      it('Then it should not call service method', () => {
        const mockTechs = {
          Ikkyo: { techs: ['Stay'], number: 6 },
        } as unknown as MyTechsList;
        const spyGet = spyOn(
          techsService,
          'getTechsCategorized'
        ).and.returnValue(of(mockTechs));
        component.techPages.Ikkyo.page = 2;

        component.handleNext('Ikkyo');

        expect(component.techPages.Ikkyo.page).toBe(2);
        expect(spyGet).not.toHaveBeenCalled();
        expect(component.techs).toEqual(mockGetCatReturn);
      });
    });
  });

  describe('When call the handlePrev method', () => {
    describe('And there is a previous page', () => {
      it('Then it should call the service method with previous page', () => {
        component.techPages.Ikkyo.page = 2;

        const mockTechs = {
          Ikkyo: { techs: ['Prev'], number: 0 },
        } as unknown as MyTechsList;
        const spyGet = spyOn(
          techsService,
          'getTechsCategorized'
        ).and.returnValue(of(mockTechs as unknown as MyTechsList));

        component.handlePrev('Ikkyo');
        expect(component.techPages.Ikkyo.page).toBe(1);
        expect(spyGet).toHaveBeenCalledWith('1', 'Ikkyo');
        expect(component.techs).toEqual({
          Ikkyo: { techs: ['Prev'], number: 0 },
          Nikkyo: { techs: [{}], number: 6 },
          Sankyo: { techs: [], number: 6 },
        } as unknown as MyTechsList);
      });
    });

    describe('And it is on page 1', () => {
      it('Then it should not call service', () => {
        const mockTechs = {
          Ikkyo: { techs: ['STAY'], number: 0 },
        } as unknown as MyTechsList;
        const spyGet = spyOn(
          techsService,
          'getTechsCategorized'
        ).and.returnValue(of(mockTechs as unknown as MyTechsList));
        component.techPages.Ikkyo.page = 1;

        component.handlePrev('Ikkyo');
        expect(component.techPages.Ikkyo.page).toBe(1);
        expect(spyGet).not.toHaveBeenCalled();
        expect(component.techs).toEqual(mockGetCatReturn);
      });
    });
  });
});

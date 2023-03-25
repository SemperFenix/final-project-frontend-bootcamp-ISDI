import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechsListComponent } from './techs-list.component';
import { TechsService } from '../services/techs.service';
import { first, of } from 'rxjs';
import { MyTechsList, TechPages, Tech } from 'src/types/tech';
import { mockTechsService } from '../utils/mocks/test.mocks';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';

describe('TechsListComponent', () => {
  let component: TechsListComponent;
  let fixture: ComponentFixture<TechsListComponent>;
  let techsService: TechsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechsListComponent],
      imports: [FontawesomeIconsModule],
      providers: [{ provide: TechsService, useValue: mockTechsService }],
    }).compileComponents();
  });

  beforeEach(() => {
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

  it('should initialize tech pages', () => {
    expect(component.techPages).toBeDefined();
    expect(Object.keys(component.techPages).length).toBeGreaterThan(0);
  });

  it('should load techs', () => {
    component.techsToSearch = ['Ikkyo', 'Nikkyo', 'Sankyo'];

    const mockTechs = {
      Ikkyo: { techs: [], number: 0 },
      Nikkyo: { techs: [], number: 0 },
    } as unknown as MyTechsList;
    const spyGet = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of(mockTechs).pipe(first())
    );

    component.ngOnInit();

    expect(spyGet).toHaveBeenCalledTimes(3);

    expect(component.techs).toEqual({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
  });

  it('should handle next with next page', () => {
    techsService.techs$.next({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
    const mockTechs = {
      Ikkyo: { techs: [], number: 6 },
    } as unknown as MyTechsList;
    const spyGet = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of(mockTechs)
    );
    component.techPages.Ikkyo.page = 1;

    component.handleNext('Ikkyo');

    expect(component.techPages.Ikkyo.page).toBe(2);
    expect(spyGet).toHaveBeenCalledWith('2', 'Ikkyo');
    expect(component.techs).toEqual({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
  });

  it('should handle next but return', () => {
    techsService.techs$.next({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
    const mockTechs = {
      Ikkyo: { techs: [], number: 6 },
    } as unknown as MyTechsList;
    const spyGet = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of(mockTechs)
    );
    component.techPages.Ikkyo.page = 2;

    component.handleNext('Ikkyo');

    expect(component.techPages.Ikkyo.page).toBe(2);
    expect(spyGet).not.toHaveBeenCalled();
    expect(component.techs).toEqual({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
  });

  it('should handle prev', () => {
    component.techPages.Ikkyo.page = 2;
    component.techPages.Nikkyo.page = 2;
    component.techPages.Sankyo.page = 2;
    techsService.techs$.next({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
    const mockTechs = {
      Ikkyo: { techs: [{}, {}, {}], number: 0 },
      Nikkyo: { techs: [{}, {}, {}], number: 0 },
      Sankyo: { techs: [{}, {}, {}], number: 0 },
    } as unknown as MyTechsList;
    const spyGet = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of(mockTechs as unknown as MyTechsList)
    );

    component.handlePrev('Ikkyo');
    expect(component.techPages.Ikkyo.page).toBe(1);
    expect(spyGet).toHaveBeenCalledWith('1', 'Ikkyo');
    expect(component.techs).toEqual({
      Ikkyo: { techs: [{}, {}, {}], number: 0 },
      Nikkyo: { techs: [{}, {}, {}], number: 0 },
      Sankyo: { techs: [{}, {}, {}], number: 0 },
    } as unknown as MyTechsList);
  });

  it('should handle prev but no page', () => {
    techsService.techs$.next({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
    const mockTechs = {
      Ikkyo: { techs: [{}, {}, {}], number: 0 },
      Nikkyo: { techs: [{}, {}, {}], number: 0 },
      Sankyo: { techs: [{}, {}, {}], number: 0 },
    } as unknown as MyTechsList;
    const spyGet = spyOn(techsService, 'getTechsCategorized').and.returnValue(
      of(mockTechs as unknown as MyTechsList)
    );
    component.techPages.Ikkyo.page = 1;
    component.techPages.Nikkyo.page = 1;
    component.techPages.Sankyo.page = 1;

    component.handlePrev('Ikkyo');
    expect(component.techPages.Ikkyo.page).toBe(1);
    expect(spyGet).not.toHaveBeenCalled();
    expect(component.techs).toEqual({
      Ikkyo: { techs: [], number: 6 },
      Nikkyo: { techs: [{}], number: 6 },
      Sankyo: { techs: [], number: 6 },
    } as unknown as MyTechsList);
  });

  it('checkExistence', () => {
    component.techPages = {
      Ikkyo: { page: 5, exists: false },
      Nikkyo: { page: 2, exists: false },
    } as TechPages;
    component['checkExistence']([{} as Tech, {} as Tech], 'Ikkyo');
    expect(component.techPages.Ikkyo.exists).toBeTrue();
  });
});

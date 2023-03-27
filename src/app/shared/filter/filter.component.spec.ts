import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When changeField method is called', () => {
    it('Then it should set value of field assigned', () => {
      const select = fixture.debugElement.query(By.css('#attack'))
        .nativeElement as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.filterOptions.value.attack).toBe('Katate-dori');
    });
  });

  describe('When sendToParent method is called', () => {
    it('Then it should emit event', () => {
      component.filterOptions.setValue({
        attack: 'Shomen-uchi',
        tech: 'Ikkyo',
        stand: null,
        grade: null,
      });
      const spyReset = spyOn(component.filterOptions, 'reset');
      const spyEmit = spyOn(component.itSubmit, 'emit');
      component.sendToParent();

      expect(spyReset).toHaveBeenCalled();
      expect(spyEmit).toHaveBeenCalled();
    });
  });
});

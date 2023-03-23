import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsListComponent } from './techs-list.component';

describe('TechsListComponent', () => {
  let component: TechsListComponent;
  let fixture: ComponentFixture<TechsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

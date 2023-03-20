import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { FontawesomeIconsModule } from 'src/app/fontawesome/fontawesome.icons.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontawesomeIconsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When call burger method', () => {
    it('Then it should change its value', () => {
      component.burgerOption();

      expect(component.burger).toBe(false);
    });
  });

  describe('When call menu method', () => {
    it('Then it should change its value', () => {
      component.menu();

      expect(component.burger).toBe(false);
    });
  });
});

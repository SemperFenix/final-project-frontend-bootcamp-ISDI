import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontawesomeIconsModule } from 'src/app/fontawesome/fontawesome.icons.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FontawesomeIconsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When call the sendToParentMethod', () => {
    it('Then it should call the menu.next', () => {
      const spyNext = spyOn(component.menu, 'next');
      component.sendToParent();
      expect(spyNext).toHaveBeenCalled();
    });
  });
});

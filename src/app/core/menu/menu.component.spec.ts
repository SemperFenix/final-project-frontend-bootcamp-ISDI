import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { mockLoginService, mockUser } from 'src/app/utils/mocks/test.mocks';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When onInit', () => {
    it('Then it should call getLoggedUser$ service', () => {
      const spyLogin = spyOn(service, 'getLoggedUser$').and.returnValue(
        of(mockUser)
      );
      component.ngOnInit();

      expect(spyLogin).toHaveBeenCalled();
    });
  });

  describe('When called the handleLogout method', () => {
    it('Then it should call loggedUser service', () => {
      const spyLogout = spyOn(service, 'loggedUser').and.callThrough();
      component.handleLogout();

      expect(spyLogout).toHaveBeenCalled();
    });
  });
});

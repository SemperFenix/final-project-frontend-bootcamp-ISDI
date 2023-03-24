import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { mockLoginService, mockToken } from 'src/app/utils/mocks/test.mocks';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginService } from '../services/login.service';

describe('Given the LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'my-profile', component: UserProfileComponent },
        ]),
      ],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Given the handleSubmit method', () => {
    describe('When called with correct data', () => {
      it('Should call the aikidoUsers login service and next', () => {
        component.newLoginForm.value['email'] = 'TestMail';
        component.newLoginForm.value['password'] = 'TestPass';
        const spyLogin = spyOn(service, 'login').and.returnValue(of(mockToken));
        component.handleSubmit();

        expect(spyLogin).toHaveBeenCalled();
      });
    });

    describe('When called with incorrect data', () => {
      it('Should call the aikidoUsers login service and return', () => {
        const spyLogin = spyOn(service, 'login').and.returnValue(
          of(undefined as unknown as string)
        );
        const spyLocal = spyOn(localStorage, 'setItem');

        component.handleSubmit();

        expect(spyLogin).toHaveBeenCalled();
        expect(spyLocal).not.toHaveBeenCalled();
      });
    });
  });
});

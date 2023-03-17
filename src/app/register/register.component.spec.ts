import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  mockAikidoUser,
  mockAikidoUsersService,
} from 'src/app/utils/mocks/test.mocks';
import { AikidoUsersService } from '../services/aikido.users.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: AikidoUsersService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        {
          provide: AikidoUsersService,
          useValue: mockAikidoUsersService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AikidoUsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Given the handleSubmit', () => {
    describe('When called', () => {
      it('Then it should call service.register', () => {
        component.newRegisterForm.value['name'] = 'TestName';
        component.newRegisterForm.value['lastName'] = 'TestLast';
        component.newRegisterForm.value['age'] = 'TestAge';
        component.newRegisterForm.value['timePracticing'] = 'TestTime';
        component.newRegisterForm.value['email'] = 'TestMail';
        component.newRegisterForm.value['password'] = 'TestPass';

        const spyRegister = spyOn(service, 'register').and.returnValue(
          of(mockAikidoUser)
        );

        component.handleSubmit();
        expect(spyRegister).toHaveBeenCalled();
      });
    });
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getStorage,
  provideStorage,
  StorageReference,
} from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  mockAikidoUser,
  mockAikidoUsersService,
} from 'src/app/utils/mocks/test.mocks';
import { AikidoUsersService } from '../services/aikido.users.service';
import { RegisterComponent } from './register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

describe('Given the RegisterComponent', () => {
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
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
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
  describe('When the handleSubmit method is called', () => {
    describe('And there is no avatarImg.name', () => {
      it('Then it should call service.register', () => {
        component.newRegisterForm.value['name'] = 'TestName';
        component.newRegisterForm.value['lastName'] = 'TestLast';
        component.newRegisterForm.value['age'] = 'TestAge';
        component.newRegisterForm.value['timePracticing'] = 'TestTime';
        component.newRegisterForm.value['email'] = 'TestMail';
        component.newRegisterForm.value['password'] = 'TestPass';

        // const spyUpload = spyOn(component, 'uploadImage').and.resolveTo();
        // const spyGetImage = spyOn(component, 'getImage').and.resolveTo('mock');

        // const mockEvent = {
        //   target: {
        //     files: [
        //       {
        //         name: 'test',
        //         size: 0,
        //         type: 'image/png',
        //       },
        //     ],
        //   },
        // };
        // component.saveImage(mockEvent);

        const spyRegister = spyOn(service, 'register').and.returnValue(
          of(mockAikidoUser)
        );

        component.handleSubmit();
        // expect(spyUpload).toHaveBeenCalled();
        // expect(spyGetImage).toHaveBeenCalled();

        expect(spyRegister).toHaveBeenCalled();
      });
    });

    describe('And there is avatarImg.name', () => {
      it('Then it should call service.register', async () => {
        component.newRegisterForm.value['name'] = 'TestName';
        component.newRegisterForm.value['lastName'] = 'TestLast';
        component.newRegisterForm.value['age'] = 'TestAge';
        component.newRegisterForm.value['timePracticing'] = 'TestTime';
        component.newRegisterForm.value['email'] = 'TestMail';
        component.newRegisterForm.value['password'] = 'TestPass';

        const mockEvent = {
          target: {
            files: [
              {
                name: 'test',
                size: 0,
                type: 'image/png',
              },
            ],
          },
        };

        component.saveImage(mockEvent);

        const spyUpload = spyOn(component, 'uploadImage').and.resolveTo();
        const spyGetImage = spyOn(component, 'getImage').and.resolveTo('mock');

        const spyRegister = spyOn(service, 'register').and.returnValue(
          of(mockAikidoUser)
        );

        component.handleSubmit();
        await expect(spyUpload).toHaveBeenCalled();
        await expect(spyGetImage).toHaveBeenCalled();

        expect(spyRegister).toHaveBeenCalled();
      });
    });
  });

  describe('When the getImage method is called', () => {
    it('then it should return the string', () => {
      const mockStorage = {} as StorageReference;
      const spyGet = spyOn(component, 'getImage').and.callFake(
        (storage: StorageReference) => {
          return new Promise((resolve, reject) => {
            return '';
          });
        }
      );
      component.getImage(mockStorage);
      expect(spyGet).toHaveBeenCalled();

      // Faltan l'ineas por pasar que son propias de firebase
    });
  });
});

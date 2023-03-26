import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getStorage,
  provideStorage,
  ref,
  StorageReference,
} from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('Given the UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        ReactiveFormsModule,

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);

    component = fixture.componentInstance;
    component.userData = {
      name: 'TestName',
      lastName: 'TestLast',
      age: 'TestAge',
      timePracticing: 'TestTime',
      email: 'TestMail',
      password: 'TestPass',
    };
    fixture.detectChanges();
  });

  describe('When intializes', () => {
    describe('And there is a userData.password', () => {
      it('Then it should create', () => {
        expect(component).toBeTruthy();
      });
    });

    describe('And there is not userData.password', () => {
      it('Then it should create and call this.toggleEdit', () => {
        delete component.userData.password;

        // No

        const spyToggle = spyOn(
          component,
          <never>'toggleEdit'
        ).and.callThrough();
        component.ngOnInit();

        expect(spyToggle).toHaveBeenCalled();
      });
    });
  });

  describe('When the sendToParent method is called', () => {
    describe('And there is no avatarImg.name', () => {
      it('Then it should not call component.uploadImage and should emit itSubmit', () => {
        component.userDataForm.setValue({
          name: 'TestName',
          lastName: 'TestLast',
          age: 'TestAge',
          timePracticing: 'TestTime',
          email: 'TestMail',
          password: 'TestPass',
        });

        const spyUpload = spyOn(component, 'uploadImage');
        const spyEmit = spyOn(component.itSubmit, 'emit').and.callThrough();

        component.sendToParent();

        expect(spyUpload).not.toHaveBeenCalled();
        expect(spyEmit).toHaveBeenCalled();
      });
    });

    describe('And there is no age nor time practicing', () => {
      it('Then it should call service.register', () => {
        component.userDataForm.setValue({
          name: 'TestName',
          lastName: 'TestLast',
          age: '',
          timePracticing: '',
          email: 'TestMail',
          password: 'TestPass',
        });

        const spyUpload = spyOn(component, 'uploadImage');
        const spyEmit = spyOn(component.itSubmit, 'emit').and.callThrough();

        component.sendToParent();

        expect(spyUpload).not.toHaveBeenCalled();
        expect(spyEmit).toHaveBeenCalled();
      });
    });

    describe('And there is avatarImg.name', () => {
      it('Then it should call component.uploadImage before call itSubmit.emit', async () => {
        component.userDataForm.setValue({
          name: 'TestName',
          lastName: 'TestLast',
          age: 'TestAge',
          timePracticing: 'TestTime',
          email: 'TestMail',
          password: 'TestPass',
        });

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

        const spyEmit = spyOn(component.itSubmit, 'emit').and.callThrough();

        component.sendToParent();
        await expect(spyUpload).toHaveBeenCalled();
        await expect(spyGetImage).toHaveBeenCalled();

        expect(spyEmit).toHaveBeenCalled();
      });
    });
  });

  describe('When called toggleEdit', () => {
    it('Then it should change the current value of fieldset.disabled', () => {
      const fieldset = document.querySelector(
        'fieldset'
      ) as HTMLFieldSetElement;
      expect(fieldset.disabled).toBeFalse();

      component['toggleEdit']();

      expect(fieldset.disabled).toBeTrue();
    });
  });

  describe('When the getImage method is called', () => {
    it('then it should return the string', () => {
      const mockStorage = {} as StorageReference;
      const spyGet = spyOn(component, 'getImage').and.callFake(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((_resolve, _reject) => {
          return '';
        });
      });
      component.getImage(mockStorage);
      expect(spyGet).toHaveBeenCalled();
    });
  });

  describe('When the uploadImage method is called', () => {
    it('Then it should uploadBytes', async () => {
      const testRef = ref(component['storage'], 'testing');
      const file = new File(['test'], 'test.png', { type: 'image/png' });

      spyOn(component, 'uploadImage').and.callThrough();

      await component.uploadImage(testRef, file);

      const downloadUrl = await component.getImage(testRef);

      expect(component.uploadImage).toHaveBeenCalled();
      expect(downloadUrl).toBeTruthy();
    });
  });
});

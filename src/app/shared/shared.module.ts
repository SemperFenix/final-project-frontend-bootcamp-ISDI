import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    FontawesomeIconsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  exports: [UserFormComponent],
})
export class SharedModule {}

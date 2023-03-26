import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '../utils/modals/modals.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterModalComponent } from '../utils/modals/register-modal/register-modal.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, RegisterModalComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    ModalsModule,
    RegisterRoutingModule,

    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
})
export class RegisterModule {}

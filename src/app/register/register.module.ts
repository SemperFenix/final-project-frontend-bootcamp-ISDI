import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '../utils/modals/modals.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterModalComponent } from '../utils/modals/register-modal/register-modal.component';

@NgModule({
  declarations: [RegisterComponent, RegisterModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalsModule,
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}

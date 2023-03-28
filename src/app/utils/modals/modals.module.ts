import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@NgModule({
  declarations: [ErrorModalComponent, RegisterModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [ErrorModalComponent, RegisterModalComponent],
})
export class ModalsModule {}

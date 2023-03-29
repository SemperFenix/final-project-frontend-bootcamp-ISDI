import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechDetailsRoutingModule } from './tech-details-routing.module';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { SharedModule } from '../shared/shared.module';
import { ModalsModule } from '../utils/modals/modals.module';
import { TechDetailsComponent } from './tech-details.component';
import { SafePipe } from '../utils/safe.pipe';

@NgModule({
  declarations: [TechDetailsComponent, SafePipe],
  imports: [
    CommonModule,
    TechDetailsRoutingModule,
    FontawesomeIconsModule,
    ModalsModule,
    SharedModule,
  ],
})
export class TechDetailsModule {}

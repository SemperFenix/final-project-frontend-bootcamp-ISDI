import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechsListComponent } from './techs-list.component';
import { TechsListRoutingModule } from './techs-list-routing.module';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TechsListComponent],
  imports: [
    CommonModule,
    TechsListRoutingModule,
    FontawesomeIconsModule,
    SharedModule,
  ],
})
export class TechsListModule {}

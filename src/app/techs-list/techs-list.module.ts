import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechsListComponent } from './techs-list.component';
import { TechsListRoutingModule } from './techs-list-routing.module';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';

@NgModule({
  declarations: [TechsListComponent],
  imports: [CommonModule, TechsListRoutingModule, FontawesomeIconsModule],
})
export class TechsListModule {}

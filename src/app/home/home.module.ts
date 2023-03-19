import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FontawesomeIconsModule, HomeRoutingModule],
})
export class HomeModule {}

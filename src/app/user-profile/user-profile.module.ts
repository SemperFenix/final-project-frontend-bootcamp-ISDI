import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, UserProfileRoutingModule, FontawesomeIconsModule],
})
export class UserProfileModule {}

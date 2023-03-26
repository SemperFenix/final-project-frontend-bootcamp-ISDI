import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontawesomeIconsModule } from '../fontawesome/fontawesome.icons.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FontawesomeIconsModule,
    SharedModule,
  ],
})
export class UserProfileModule {}

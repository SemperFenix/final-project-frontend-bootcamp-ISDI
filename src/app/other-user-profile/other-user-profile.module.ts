import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherUserProfileComponent } from './other-user-profile.component';
import { OtherUserProfileRoutingModule } from './other-user-profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OtherUserProfileComponent],
  imports: [CommonModule, OtherUserProfileRoutingModule, SharedModule],
})
export class OtherUserProfileModule {}

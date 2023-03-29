import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherUserProfileComponent } from './other-user-profile.component';

const routes: Routes = [{ path: '', component: OtherUserProfileComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherUserProfileRoutingModule {}

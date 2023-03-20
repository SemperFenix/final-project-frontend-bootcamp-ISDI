import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: UserProfileComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}

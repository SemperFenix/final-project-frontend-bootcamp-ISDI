import { NgModule } from '@angular/core';
import { TechDetailsComponent } from './tech-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: TechDetailsComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechDetailsRoutingModule {}

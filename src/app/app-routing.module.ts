import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./').then((m) => m.HomeModule),
  // },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users-list/users-list.module').then((m) => m.UsersListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

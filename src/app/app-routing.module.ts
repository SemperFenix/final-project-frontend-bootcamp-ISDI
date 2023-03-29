import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
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
  {
    path: 'techs',
    loadChildren: () =>
      import('./techs-list/techs-list.module').then((m) => m.TechsListModule),
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./other-user-profile/other-user-profile.module').then(
        (m) => m.OtherUserProfileModule
      ),
  },
  {
    path: 'tech/details',
    loadChildren: () =>
      import('./tech-details/tech-details.module').then(
        (m) => m.TechDetailsModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

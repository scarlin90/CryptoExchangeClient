import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { IsLoggedinGuard } from './shared/guards/is-loggedin.guard';

// const appRoutes: Routes = [
//     { path: 'login', component: LoginComponent },
//     { path: '',   redirectTo: '/login', pathMatch: 'full' },
//   ];

  const appRoutes: Routes = [
    {
      path: 'login',
      loadChildren: 'app/login/login.module#LoginModule',
    },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        canActivate: [
          IsLoggedinGuard
        ],
      },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedinGuard } from '../shared/guards/is-loggedin.guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  {  path: '',
  component: LoginComponent,
},
];

@NgModule({
imports: [
  RouterModule.forChild(
      loginRoutes,
    )
],
exports: [
  RouterModule,
]
})
export class LoginRoutingModule { }

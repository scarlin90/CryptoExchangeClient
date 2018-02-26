import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedinGuard } from '../shared/guards/is-loggedin.guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from '../shared/shared.module';

const dashboardRoutes: Routes = [
  {  path: '',
  component: DashboardComponent,
  canActivate: [
    IsLoggedinGuard
  ], },
  
];

@NgModule({
imports: [
  RouterModule.forChild(
    dashboardRoutes,
    )
],
exports: [
  RouterModule,
]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  entryComponents: [LoginComponent],
})
export class LoginModule { }

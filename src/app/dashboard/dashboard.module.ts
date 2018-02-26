import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ExchangeModule } from '../exchange/exchange.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    MaterialModule,
    DashboardRoutingModule,
    CommonModule,
    ExchangeModule,
    FormsModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeListingsComponent } from './exchange-listings/exchange-listings.component';
import { MaterialModule } from '../material/material.module';
import { ExchangeCapPiechartComponent } from './exchange-cap-piechart/exchange-cap-piechart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule
  ],
  declarations: [ExchangeListingsComponent, ExchangeCapPiechartComponent],
  exports: [ExchangeListingsComponent, ExchangeCapPiechartComponent],
})
export class ExchangeModule { }

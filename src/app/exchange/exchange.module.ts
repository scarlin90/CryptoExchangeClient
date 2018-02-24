import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeListingsComponent } from './exchange-listings/exchange-listings.component';
import { MaterialModule } from '../material/material.module';
import { ExchangeCapPiechartComponent } from './exchange-cap-piechart/exchange-cap-piechart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ExchangeCurrencyTrendLineGraphComponent } from './exchange-currency-trend-line-graph/exchange-currency-trend-line-graph.component';
import { ExchangeService } from '../shared/services/exchange.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule
  ],
  declarations: [ExchangeListingsComponent, ExchangeCapPiechartComponent, ExchangeCurrencyTrendLineGraphComponent],
  exports: [ExchangeListingsComponent, ExchangeCapPiechartComponent, ExchangeCurrencyTrendLineGraphComponent],
  providers: [ExchangeService]
})
export class ExchangeModule { }

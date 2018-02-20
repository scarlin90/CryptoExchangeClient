import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeListingsComponent } from './exchange-listings/exchange-listings.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ExchangeListingsComponent],
  exports: [ExchangeListingsComponent],
})
export class ExchangeModule { }

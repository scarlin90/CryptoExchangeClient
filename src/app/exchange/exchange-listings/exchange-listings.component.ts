import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ExchangeListingEmitter } from '../../shared/emitters/exchange-listing.emitter';
import { ExchangeListingDataSource } from '../../shared/datasources/exchange-listing.datasouce';
import { BaseExchangeListing } from '../../shared/constants/base-exchange-listing.constant';
import { ExchangeCurrency, CurrencyType } from '../../shared/models/exchange-currency.model';
import { ExchangeListing } from '../../shared/models/exchange-listing.model';
import { ExchangeService } from '../../shared/services/exchange.service';

@Component({
  selector: 'app-exchange-listings',
  templateUrl: './exchange-listings.component.html',
  styleUrls: ['./exchange-listings.component.css'],
  providers: [ExchangeService]
})
export class ExchangeListingsComponent implements OnInit {

  displayedColumns = ['dateTime', 'bitcoin', 'ethereum', 'ripple'];
  dataSource: ExchangeListingDataSource | null;

  constructor(private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.dataSource = this.exchangeService.dataSource;
  }

  getVarianceClass(exchangeCurrency: ExchangeCurrency): string {
    switch (exchangeCurrency.varianceIndicator) {
      case '+': {
        return 'color-green';
      }
      case '-': {
        return 'color-red';
      }
      default: {
         return 'color-white';
      }
    }
  }

  getVarianceIndicatorIcon(exchangeCurrency: ExchangeCurrency): string {
    switch (exchangeCurrency.varianceIndicator) {
      case '+': {
        return 'arrow_drop_up';
      }
      case '-': {
        return 'arrow_drop_down';
      }
      default: {
         return 'remove ';
      }
    }
  }
}

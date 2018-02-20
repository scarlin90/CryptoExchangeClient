import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-listings',
  templateUrl: './exchange-listings.component.html',
  styleUrls: ['./exchange-listings.component.css']
})
export class ExchangeListingsComponent implements OnInit {

  displayedColumns = ['dateTime', 'bitcoin', 'ethereum', 'ripple'];
  exchangeHistory = EXCHANGE_DATA;

  constructor() {
  }

  ngOnInit() {
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

export interface ExchangeListing {
dateTime: Date;
exchangeCurrencyData: Map<string, ExchangeCurrency>;
}

export interface ExchangeCurrency {
  currencyType: CurrencyType;
  value: number;
  variance: number;
  varianceIndicator: string;
}

export enum CurrencyType {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  Ripple = 'Ripple'
}

const EXCHANGE_DATA: ExchangeListing[] = [
  {
    dateTime: new Date('2018-02-19T09:05:00'),
    exchangeCurrencyData : new Map<string, ExchangeCurrency>()
                            .set(CurrencyType.Bitcoin,
                              {
                                currencyType: CurrencyType.Bitcoin,
                                value: 7023,
                                variance: 23,
                                varianceIndicator: '+'
                              })
                            .set(CurrencyType.Ethereum,
                              {
                                currencyType: CurrencyType.Ethereum,
                                value: 986,
                                variance: 7,
                                varianceIndicator: '+'
                              })
                            .set(CurrencyType.Ripple,
                              {
                                currencyType: CurrencyType.Ripple,
                                value: 119,
                                variance: 5,
                                varianceIndicator: '-'
                              })
  },
  {
    dateTime: new Date('2018-02-19T09:00:00'),
    exchangeCurrencyData : new Map<CurrencyType, ExchangeCurrency>()
                            .set(CurrencyType.Bitcoin,
                              {
                                currencyType: CurrencyType.Bitcoin,
                                value: 7000,
                                variance: 0,
                                varianceIndicator: ''
                              })
                            .set(CurrencyType.Ethereum,
                              {
                                currencyType: CurrencyType.Ethereum,
                                value: 979,
                                variance: 0,
                                varianceIndicator: ''
                              })
                            .set(CurrencyType.Ripple,
                              {
                                currencyType: CurrencyType.Ripple,
                                value: 124,
                                variance: 0,
                                varianceIndicator: ''
                              })
  },
];

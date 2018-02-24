import { Injectable } from '@angular/core';
import { ExchangeListing } from '../models/exchange-listing.model';
import { BaseExchangeListing } from '../constants/base-exchange-listing.constant';
import { ExchangeCurrency, CurrencyType } from '../models/exchange-currency.model';
import { timer } from 'rxjs/observable/timer';
import { ExchangeListingDataSource } from '../datasources/exchange-listing.datasouce';
import { ExchangeListingEmitter } from '../emitters/exchange-listing.emitter';
import { MarketCap } from '../constants/market-cap.constant';
import { ExchangeCurrencyShare } from '../models/exchange-currency-share.model';

@Injectable()
export class ExchangeService {

  dataSource: ExchangeListingDataSource;
  exchangeListings: ExchangeListing[];
  exchangeListingEmitter: ExchangeListingEmitter;
  poller: any;
  latestExchangeListing: ExchangeListing = BaseExchangeListing.EXCHANGE_DATA[0];
  exchangeMarketShare: ExchangeCurrencyShare[];

  constructor() {
    this.poller = timer(0,4000);
    this.startListening();
   }

  startListening() {
    
    this.exchangeListingEmitter = new ExchangeListingEmitter();
    this.dataSource = new ExchangeListingDataSource(this.exchangeListingEmitter);
    
    const subscribe = this.poller.subscribe(tick => {
      this.latestExchangeListing = this.getRandomExchangeListing(BaseExchangeListing.EXCHANGE_DATA[0]);
      BaseExchangeListing.EXCHANGE_DATA.unshift(this.latestExchangeListing);

      if(BaseExchangeListing.EXCHANGE_DATA.length == 11){
        BaseExchangeListing.EXCHANGE_DATA.pop();
      }

      this.exchangeListingEmitter.dataChange.next(BaseExchangeListing.EXCHANGE_DATA);
      this.exchangeListingEmitter.dataChange2.next(this.getLatestMarketShare());
    });
  }

  stopListening() {
    this.poller = undefined;
  }

  getRandomExchangeListing(previousExchangeListing: ExchangeListing): ExchangeListing {

    let bitcoinVariance = 0;
    let ethereumVariance = 0;
    let rippleVariance = 0;
    let bitcoinVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    let ethereumVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    let rippleVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    
    if(bitcoinVarianceIndicatorNumber !== 0) {
      bitcoinVariance = Math.floor((Math.random() * 60));
    }
    
    if(ethereumVarianceIndicatorNumber !== 0) {
      ethereumVariance = Math.floor((Math.random() * 30));
    }

    if(rippleVarianceIndicatorNumber !== 0) {
      rippleVariance = Math.floor((Math.random() * 10));
    }

    let variantBitcoinValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Bitcoin).value + bitcoinVariance;
    let variantEthereumValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ethereum).value + ethereumVariance;
    let variantRippleValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ripple).value + rippleVariance;
    

    let exchangeListing : ExchangeListing = {
      dateTime: new Date(),
      exchangeCurrencyData : new Map<string, ExchangeCurrency>()
                              .set(CurrencyType.Bitcoin,
                                {
                                  currencyType: CurrencyType.Bitcoin,
                                  value: variantBitcoinValue,
                                  variance: bitcoinVariance,
                                  varianceIndicator: this.getVarianceIndicator(bitcoinVarianceIndicatorNumber)
                                })
                              .set(CurrencyType.Ethereum,
                                {
                                  currencyType: CurrencyType.Ethereum,
                                  value: variantEthereumValue,
                                  variance: ethereumVariance,
                                  varianceIndicator: this.getVarianceIndicator(ethereumVarianceIndicatorNumber)
                                })
                              .set(CurrencyType.Ripple,
                                {
                                  currencyType: CurrencyType.Ripple,
                                  value: variantRippleValue,
                                  variance: rippleVariance,
                                  varianceIndicator: this.getVarianceIndicator(rippleVarianceIndicatorNumber)
                                })
    }
    return exchangeListing;
  }

  getLatestMarketShare(): ExchangeCurrencyShare[] {

    let bitcoinTotalMarketShare = MarketCap.TOTAL_AMMOUNT_BITCOIN * this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Bitcoin).value;
    let ethereumTotalMarketShare = MarketCap.TOTAL_AMMOUNT_ETHEREUM * this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Ethereum).value;
    let rippleTotalMarketShare = MarketCap.TOTAL_AMMOUNT_RIPPLE * this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Ripple).value;
  
    return [
            {name: CurrencyType.Bitcoin, value: bitcoinTotalMarketShare},
            {name: CurrencyType.Ethereum, value: ethereumTotalMarketShare},
            {name: CurrencyType.Ripple, value: rippleTotalMarketShare},
          ]
  }

  getVarianceIndicator(generatedVarianceNumber: number) : string {
    switch (generatedVarianceNumber) {
      case 1: {
        return '+';
      }
      case 2: {
        return '-';
      }
      default: {
         return '';
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { ExchangeListing } from '../models/exchange-listing.model';
import { BaseExchangeListing } from '../constants/base-exchange-listing.constant';
import { ExchangeCurrency, CurrencyType } from '../models/exchange-currency.model';
import { timer } from 'rxjs/observable/timer';
import { ExchangeListingDataSource } from '../datasources/exchange-listing.datasouce';
import { MarketCap } from '../constants/market-cap.constant';
import { ExchangeCurrencyShare } from '../models/exchange-currency-share.model';
import { ExchangeCurrencyTrends, ExchangeCurrencyTrend } from '../models/exchange-currency-trends.model';
import { Variance } from '../constants/variance.constant';
import { ExchangeDataEmitter } from '../emitters/exchange-data.emitter';

@Injectable()
export class ExchangeService {

  dataSource: ExchangeListingDataSource;
  exchangeListings: ExchangeListing[];
  exchangeDataEmitter: ExchangeDataEmitter;
  poller: any;
  latestExchangeListing: ExchangeListing = BaseExchangeListing.EXCHANGE_DATA[0];
  exchangeMarketShare: ExchangeCurrencyShare[];
  chartData = BaseExchangeListing.CURRENCY_TREND_DATA;

  constructor() {
    this.poller = timer(0,4000);
    this.startListening();
   }

  startListening() {

    this.exchangeDataEmitter = new ExchangeDataEmitter();
    this.dataSource = new ExchangeListingDataSource(this.exchangeDataEmitter);
    
    const subscribe = this.poller.subscribe(tick => {
      this.exchangeDataEmitter.exchangeListingDataStream.next(this.getExchangeListings());
      this.exchangeDataEmitter.exchangeCurrencyShareDataStream.next(this.getLatestMarketShare());
      this.exchangeDataEmitter.exchangeCurrencyTrendDataStream.next(this.getCurrencyTrends());
    });
  }

  stopListening() {
    this.poller = undefined;
  }

  getExchangeListings(): ExchangeListing[] {
    this.latestExchangeListing = this.getRandomExchangeListing(BaseExchangeListing.EXCHANGE_DATA[0]);
      BaseExchangeListing.EXCHANGE_DATA.unshift(this.latestExchangeListing);

      if(BaseExchangeListing.EXCHANGE_DATA.length == 6){
        BaseExchangeListing.EXCHANGE_DATA.pop();
      }
      return BaseExchangeListing.EXCHANGE_DATA;
  }

  getRandomExchangeListing(previousExchangeListing: ExchangeListing): ExchangeListing {

    let bitcoinVariance = 0;
    let ethereumVariance = 0;
    let rippleVariance = 0;
    let variantBitcoinValue = 0;
    let variantEthereumValue = 0;
    let variantRippleValue = 0;
    
    let bitcoinVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    let ethereumVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    let rippleVarianceIndicatorNumber = Math.floor((Math.random() * 3));
    
    if(bitcoinVarianceIndicatorNumber !== 0) {
      bitcoinVariance = Math.floor((Math.random() * Variance.BITCOIN));
    }
    
    if(ethereumVarianceIndicatorNumber !== 0) {
      ethereumVariance = Math.floor((Math.random() * Variance.ETHEREUM));
    }

    if(rippleVarianceIndicatorNumber !== 0) {
      rippleVariance = Math.floor((Math.random() * Variance.RIPPLE));
    }

    if(bitcoinVarianceIndicatorNumber === 2){
      variantBitcoinValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Bitcoin).value - bitcoinVariance;
    }
    else {
      variantBitcoinValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Bitcoin).value + bitcoinVariance;
    }

    if(ethereumVarianceIndicatorNumber === 2){
      variantEthereumValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ethereum).value - ethereumVariance;
    }
    else {
      variantEthereumValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ethereum).value + ethereumVariance;
    }

    if(rippleVarianceIndicatorNumber === 2){
      variantRippleValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ripple).value - rippleVariance;
    }
    else {
      variantRippleValue = previousExchangeListing.exchangeCurrencyData.get(CurrencyType.Ripple).value + rippleVariance;
    }

    
    
    

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

  getCurrencyTrends(): ExchangeCurrencyTrend[] {

    this.chartData[0].series.push({
      name: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), 
      value: this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Bitcoin).value
    });
    this.chartData[1].series.push({
      name: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), 
      value: this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Ethereum).value
    });
    this.chartData[2].series.push({
      name: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), 
      value: this.latestExchangeListing.exchangeCurrencyData.get(CurrencyType.Ripple).value
    });

    if(this.chartData[0].series.length >10)
    {
      this.chartData[0].series.shift();
      this.chartData[1].series.shift();
      this.chartData[2].series.shift();
    }

    return [
      { name: CurrencyType.Bitcoin, series: this.chartData[0].series},
      { name: CurrencyType.Ethereum, series: this.chartData[1].series},
      { name: CurrencyType.Ripple, series: this.chartData[2].series},
      ];
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

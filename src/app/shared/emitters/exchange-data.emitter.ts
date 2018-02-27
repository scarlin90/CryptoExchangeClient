import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExchangeListing } from "../models/exchange-listing.model";
import { BaseExchangeListing } from "../constants/base-exchange-listing.constant";
import { CurrencyType, ExchangeCurrency } from "../models/exchange-currency.model";
import { ExchangeCurrencyShare } from "../models/exchange-currency-share.model";
import { ExchangeCurrencyTrend } from "../models/exchange-currency-trends.model";

export class ExchangeDataEmitter {
    
    exchangeListingDataStream: BehaviorSubject<ExchangeListing[]> = new BehaviorSubject<ExchangeListing[]>([]);
    exchangeCurrencyShareDataStream: BehaviorSubject<ExchangeCurrencyShare[]> = new BehaviorSubject<ExchangeCurrencyShare[]>([]);
    exchangeCurrencyTrendDataStream: BehaviorSubject<ExchangeCurrencyTrend[]> = new BehaviorSubject<ExchangeCurrencyTrend[]>([]);
    constructor() {
    }
  }
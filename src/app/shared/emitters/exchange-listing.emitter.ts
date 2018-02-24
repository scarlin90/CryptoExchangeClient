import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExchangeListing } from "../models/exchange-listing.model";
import { BaseExchangeListing } from "../constants/base-exchange-listing.constant";
import { CurrencyType, ExchangeCurrency } from "../models/exchange-currency.model";
import { ExchangeCurrencyShare } from "../models/exchange-currency-share.model";
import { ExchangeCurrencyTrend } from "../models/exchange-currency-trends.model";

export class ExchangeListingEmitter {
    
    dataChange: BehaviorSubject<ExchangeListing[]> = new BehaviorSubject<ExchangeListing[]>([]);
    dataChange2: BehaviorSubject<ExchangeCurrencyShare[]> = new BehaviorSubject<ExchangeCurrencyShare[]>([]);
    dataChange3: BehaviorSubject<ExchangeCurrencyTrend[]> = new BehaviorSubject<ExchangeCurrencyTrend[]>([]);
    get data(): ExchangeListing[] { return this.dataChange.value; }
    constructor() {
    }
  }
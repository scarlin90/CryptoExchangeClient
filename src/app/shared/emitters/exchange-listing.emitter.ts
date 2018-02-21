import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExchangeListing } from "../models/exchange-listing.model";
import { BaseExchangeListing } from "../constants/base-exchange-listing.constant";
import { CurrencyType, ExchangeCurrency } from "../models/exchange-currency.model";

export class ExchangeListingEmitter {
    
    dataChange: BehaviorSubject<ExchangeListing[]> = new BehaviorSubject<ExchangeListing[]>([]);
    get data(): ExchangeListing[] { return this.dataChange.value; }
    constructor() {
      this.addExchangeListing();
    }
    addExchangeListing() {
    const copiedData = BaseExchangeListing.EXCHANGE_DATA.slice();
    copiedData.push(this.createExchangeListing());
    this.dataChange.next(copiedData);
    }

    private createExchangeListing() {
      return {
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
      };
      }
  }
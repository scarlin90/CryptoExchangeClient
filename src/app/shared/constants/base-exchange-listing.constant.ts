import { ExchangeListing } from "../models/exchange-listing.model";
import { CurrencyType, ExchangeCurrency } from "../models/exchange-currency.model";

export class BaseExchangeListing {
    public static EXCHANGE_DATA: ExchangeListing[] = [
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
}
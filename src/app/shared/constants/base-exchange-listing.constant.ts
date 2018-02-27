import { ExchangeListing } from "../models/exchange-listing.model";
import { CurrencyType, ExchangeCurrency } from "../models/exchange-currency.model";
import { ExchangeCurrencyTrend } from "../models/exchange-currency-trends.model";

export class BaseExchangeListing {
    public static EXCHANGE_DATA: ExchangeListing[] = [
        {
          dateTime: new Date('2018-02-19T09:00:00'),
          exchangeCurrencyData : new Map<CurrencyType, ExchangeCurrency>()
                                  .set(CurrencyType.Bitcoin,
                                    {
                                      currencyType: CurrencyType.Bitcoin,
                                      value: 1900,
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
                                      value: 121,
                                      variance: 0,
                                      varianceIndicator: ''
                                    })
        },
      ];

      public static CURRENCY_TREND_DATA: ExchangeCurrencyTrend[] = [
        {
          "name": CurrencyType.Bitcoin,
          "series": [
            {
              "name": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
              "value": BaseExchangeListing.EXCHANGE_DATA[0].exchangeCurrencyData.get(CurrencyType.Bitcoin).value
            },
          ]
        },
        {
          "name": CurrencyType.Ethereum,
          "series": [
            {
              "name": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
              "value": BaseExchangeListing.EXCHANGE_DATA[0].exchangeCurrencyData.get(CurrencyType.Ethereum).value
            },
          ]
        },
        {
          "name": CurrencyType.Ripple,
          "series": [
            {
              "name": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
              "value": BaseExchangeListing.EXCHANGE_DATA[0].exchangeCurrencyData.get(CurrencyType.Ripple).value
            },
          ]
        }];

        public static CURRENCY_TREND_THRESHOLDS: any[] = [
          {name: "High Value", value: 2000 },
          {name: "Mid Value", value: 900 },
          {name: "Low Value", value: 100 },
        
        ]
}
import { ExchangeCurrency } from "./exchange-currency.model";

export interface ExchangeListing {
    dateTime: Date;
    exchangeCurrencyData: Map<string, ExchangeCurrency>;
    }
    
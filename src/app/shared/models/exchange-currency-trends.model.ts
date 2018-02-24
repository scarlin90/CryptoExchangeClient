import { CurrencyType } from "./exchange-currency.model";

export class ExchangeCurrencyTrends {
    name: ExchangeCurrencyTrend[];
}

export class ExchangeCurrencyTrend {
    name: CurrencyType;
    series:  ExchangeCurrencyData[];
}

export class ExchangeCurrencyData {
    name: string;
    value: number;
}

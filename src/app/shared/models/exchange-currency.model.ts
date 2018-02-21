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
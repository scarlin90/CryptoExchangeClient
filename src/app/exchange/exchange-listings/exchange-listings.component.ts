import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-exchange-listings',
  templateUrl: './exchange-listings.component.html',
  styleUrls: ['./exchange-listings.component.css']
})
export class ExchangeListingsComponent implements OnInit {

  displayedColumns = ['dateTime', 'bitcoin', 'ethereum', 'ripple'];
  
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  constructor() {
    const source = timer(0,4000);
    this.dataSource = new ExampleDataSource(this.exampleDatabase);

    const subscribe = source.subscribe(val => {
      console.log(val);
      EXCHANGE_DATA.unshift(this.getRandomExchangeListing(EXCHANGE_DATA[0]));

      if(EXCHANGE_DATA.length == 11){
        EXCHANGE_DATA.pop();
      }

      this.exampleDatabase.dataChange.next(EXCHANGE_DATA);
    });
  }

  ngOnInit() {
  }

  getVarianceClass(exchangeCurrency: ExchangeCurrency): string {
    switch (exchangeCurrency.varianceIndicator) {
      case '+': {
        return 'color-green';
      }
      case '-': {
        return 'color-red';
      }
      default: {
         return 'color-white';
      }
    }
  }

  getVarianceIndicatorIcon(exchangeCurrency: ExchangeCurrency): string {
    switch (exchangeCurrency.varianceIndicator) {
      case '+': {
        return 'arrow_drop_up';
      }
      case '-': {
        return 'arrow_drop_down';
      }
      default: {
         return 'remove ';
      }
    }
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
}

export interface ExchangeListing {
dateTime: Date;
exchangeCurrencyData: Map<string, ExchangeCurrency>;
}

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

let EXCHANGE_DATA: ExchangeListing[] = [
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

export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
  super();
  }
  connect(): Observable<ExchangeListing[]> {
  return this._exampleDatabase.dataChange.asObservable();;
  }
  disconnect() {}
  }

  export class ExampleDatabase {
    dataChange: BehaviorSubject<ExchangeListing[]> = new BehaviorSubject<ExchangeListing[]>([]);
    get data(): ExchangeListing[] { return this.dataChange.value; }
    constructor() {
      this.addUser();
    }
    addUser() {
    const copiedData = EXCHANGE_DATA.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
    }

    private createNewUser() {
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

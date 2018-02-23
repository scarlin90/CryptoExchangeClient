import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../shared/services/exchange.service';
import { Observable } from 'rxjs/Observable';
import { ExchangeCurrencyShare } from '../../shared/models/exchange-currency-share.model';

@Component({
  selector: 'app-exchange-cap-piechart',
  templateUrl: './exchange-cap-piechart.component.html',
  styleUrls: ['./exchange-cap-piechart.component.css'],
  providers: [ExchangeService]
})
export class ExchangeCapPiechartComponent implements OnInit {

  exchangeCapData: ExchangeCurrencyShare[];
  view: any[] = [800, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private exchangeService: ExchangeService) { 

    let test = this.exchangeService.exchangeListingEmitter.dataChange2.subscribe(s => {
      this.exchangeCapData = s;
    });
    
  }

  ngOnInit() {
  }

}

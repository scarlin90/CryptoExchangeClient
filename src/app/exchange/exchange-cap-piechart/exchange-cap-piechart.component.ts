import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../shared/services/exchange.service';
import { Observable } from 'rxjs/Observable';
import { ExchangeCurrencyShare } from '../../shared/models/exchange-currency-share.model';

@Component({
  selector: 'app-exchange-cap-piechart',
  templateUrl: './exchange-cap-piechart.component.html',
  styleUrls: ['./exchange-cap-piechart.component.css'],
})
export class ExchangeCapPiechartComponent implements OnInit {

  exchangeCapData: ExchangeCurrencyShare[];
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private exchangeService: ExchangeService) { 

    let test = this.exchangeService.exchangeDataEmitter.exchangeCurrencyShareDataStream.subscribe(s => {
      this.exchangeCapData = s;
    });
    
  }

  ngOnInit() {
  }

}

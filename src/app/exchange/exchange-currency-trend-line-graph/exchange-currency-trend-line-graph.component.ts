import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../shared/services/exchange.service';
import { ExchangeCurrencyTrend } from '../../shared/models/exchange-currency-trends.model';
import { BaseExchangeListing } from '../../shared/constants/base-exchange-listing.constant';

@Component({
  selector: 'app-exchange-currency-trend-line-graph',
  templateUrl: './exchange-currency-trend-line-graph.component.html',
  styleUrls: ['./exchange-currency-trend-line-graph.component.css'],
})
export class ExchangeCurrencyTrendLineGraphComponent implements OnInit {

  chartData: ExchangeCurrencyTrend[];
  constructor(private exchangeService: ExchangeService) { 
    let test = this.exchangeService.exchangeDataEmitter.exchangeCurrencyTrendDataStream.subscribe(s => {
      this.chartData = s;
    });
  }

  ngOnInit() {
  }

  view: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time (t)';
  showYAxisLabel = true;
  yAxisLabel = 'Price per Coin (ppc)';
  referenceLines = BaseExchangeListing.CURRENCY_TREND_THRESHOLDS;
  showRefLines = true;
  showRefLabels = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  onSelect(event) {
    console.log(event);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCurrencyTrendLineGraphComponent } from './exchange-currency-trend-line-graph.component';

describe('ExchangeCurrencyTrendLineGraphComponent', () => {
  let component: ExchangeCurrencyTrendLineGraphComponent;
  let fixture: ComponentFixture<ExchangeCurrencyTrendLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeCurrencyTrendLineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCurrencyTrendLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

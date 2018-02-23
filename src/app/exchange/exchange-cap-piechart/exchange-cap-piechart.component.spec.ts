import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCapPiechartComponent } from './exchange-cap-piechart.component';

describe('ExchangeCapPiechartComponent', () => {
  let component: ExchangeCapPiechartComponent;
  let fixture: ComponentFixture<ExchangeCapPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeCapPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCapPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

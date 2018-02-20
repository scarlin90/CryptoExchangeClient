import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeListingsComponent } from './exchange-listings.component';

describe('ExchangeListingsComponent', () => {
  let component: ExchangeListingsComponent;
  let fixture: ComponentFixture<ExchangeListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

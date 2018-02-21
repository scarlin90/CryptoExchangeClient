import { ExchangeListing } from "../models/exchange-listing.model";
import { DataSource } from "@angular/cdk/table";
import { ExchangeListingEmitter } from "../emitters/exchange-listing.emitter";
import { Observable } from "rxjs/Observable";

export class ExchangeListingDataSource extends DataSource<any> {
    
    constructor(private exchangeListingEmitter: ExchangeListingEmitter) {
        super();
    }

    connect(): Observable<ExchangeListing[]> {
        return this.exchangeListingEmitter.dataChange.asObservable();
    }

    disconnect() {
        this.exchangeListingEmitter.dataChange.unsubscribe();
    }
}
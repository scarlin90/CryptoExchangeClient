import { ExchangeListing } from "../models/exchange-listing.model";
import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs/Observable";
import { ExchangeDataEmitter } from "../emitters/exchange-data.emitter";

export class ExchangeListingDataSource extends DataSource<any> {
    
    constructor(private exchangeListingEmitter: ExchangeDataEmitter) {
        super();
    }

    connect(): Observable<ExchangeListing[]> {
        return this.exchangeListingEmitter.exchangeListingDataStream.asObservable();
    }

    disconnect() {
        this.exchangeListingEmitter.exchangeListingDataStream.unsubscribe();
    }
}
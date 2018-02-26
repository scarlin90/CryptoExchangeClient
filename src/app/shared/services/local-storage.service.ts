import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  constructor() { }

  /**
   * Get value from local storage using key
   * @param key - The key of the object that you wish to retrieve from storage
   */
  get<T>(key: string): Observable<T> {
    const observable = Observable.create((observer: Subject<T>) => {

      if (key === undefined) {
          observer.error(new Error('Specified key is undefined' + key));
          return;
      }

      const item = localStorage.getItem(key) !== undefined ? JSON.parse(localStorage.getItem(key)) as T : undefined;

      if (item === undefined) {
          observer.error(new Error('Specified key ' + key + ' does not exist in Local Storage'));
          return;
      }

      observer.next(item);
    });

  return observable;

  }

  /**
   * Sets object in local storage with supplied key
   * @param key - Key that is used to define where onject will be stored
   * @param value - Value of object to be stored
   */
  set<T>(key: string, value: T): Observable<boolean> {
    const observable = Observable.create(observer => {
      const obj = JSON.stringify(value);

      if (key === undefined) {
          observer.error(new Error('Specified key is undefined'));
          return;
      }

      if (value === undefined) {
          observer.error(new Error('Specified value is undefined'));
          return;
      }

      localStorage.setItem(key, obj);

      observer.next(true);
    });

    return observable;
  }
}
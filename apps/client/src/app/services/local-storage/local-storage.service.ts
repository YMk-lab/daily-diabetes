import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(storageKey: string, data: any): Observable<any> {
    return of(localStorage.setItem(storageKey, JSON.stringify(data)));
  }

  get(storageKey: string): string {
    return JSON.parse(localStorage.getItem(storageKey));
  }

  remove(storageKey: string): void {
    localStorage.removeItem(storageKey);
  }
}

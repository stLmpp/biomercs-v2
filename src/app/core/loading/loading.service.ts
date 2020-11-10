import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor() {}

  private _loading$ = new BehaviorSubject<number>(0);
  public isLoading$ = this._loading$.asObservable().pipe(
    map(loadings => !!loadings),
    debounceTime(250)
  );

  add(): void {
    this._loading$.next(this._loading$.value + 1);
  }

  remove(): void {
    this._loading$.next(this._loading$.value - 1);
  }
}

import { Observable, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function refresh<T = any, R = any>(observable: Observable<R>): OperatorFunction<T, T> {
  return switchMap(data => observable.pipe(map(() => data)));
}

export function refreshMap<T = any, R = any>(callback: (data: T) => Observable<R>): OperatorFunction<T, T> {
  return switchMap(data => callback(data).pipe(map(() => data)));
}

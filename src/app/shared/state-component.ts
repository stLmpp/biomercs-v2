import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { isFunction, isObject } from '@stlmpp/utils';
import { Directive } from '@angular/core';
import { Destroyable } from './destroyable-component';

@Directive()
export abstract class StateComponent<T extends Record<string, any> = Record<string, any>> extends Destroyable {
  protected constructor(initialState?: Partial<T>) {
    super();
    if (initialState) {
      this._state$.next(initialState);
    }
  }

  private _state$ = new BehaviorSubject<Partial<T>>({});

  updateState(partial: Partial<T> | ((state: Partial<T>) => Partial<T>)): void;
  updateState<K extends keyof T>(key: K, value: T[K] | ((state: T[K] | undefined) => T[K])): void;
  updateState<K extends keyof T>(
    key: K | Partial<T> | ((state: Partial<T>) => Partial<T>),
    value?: T[K] | ((state: T[K] | undefined) => T[K])
  ): void {
    if (isFunction(key) || isObject(key)) {
      const callback = isFunction(key) ? key : (state: Partial<T>) => ({ ...state, ...key });
      this._state$.next(callback({ ...this._state$.value }));
    } else {
      const callback = isFunction(value) ? value : () => value;
      const state = { ...this._state$.value };
      this._state$.next({ ...state, [key]: callback(state[key]) });
    }
  }

  selectState(): Observable<T>;
  selectState<K extends keyof T>(key: K): Observable<T[K] | undefined>;
  selectState<K extends keyof T>(key?: K): Observable<T[K] | undefined | T> {
    let state$: Observable<any> = this._state$.asObservable();
    if (key) {
      state$ = state$.pipe(pluck(key));
    }
    return state$.pipe(distinctUntilChanged());
  }

  selectStateMulti<K extends keyof T>(keys: K[]): Observable<Pick<T, K>> {
    return this._state$.pipe(
      distinctUntilKeysChanged(keys),
      map(state =>
        Object.entries(state).reduce(
          (acc, [key, value]) => (keys.includes(key as any) ? { ...acc, [key]: value } : acc),
          {} as any
        )
      )
    );
  }

  getState<K extends keyof T>(key: K): T[K] | undefined {
    return this._state$.value[key];
  }
}

export function distinctUntilKeysChanged<T extends Record<string, any>, K extends keyof T>(
  keys: K[]
): OperatorFunction<T, T> {
  return distinctUntilChanged((valueA, valueB) => {
    let index = keys.length;
    while (index--) {
      const key = keys[index];
      if (valueA[key] !== valueB[key]) {
        return false;
      }
    }
    return true;
  });
}

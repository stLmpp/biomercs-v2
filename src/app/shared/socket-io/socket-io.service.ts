import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketIOService {
  private _socket?: typeof Socket;
  private _events = new Map<string, Subject<any>>();

  private _checkIfConnected(): typeof Socket {
    if (!this._socket) {
      this._socket = io('http://localhost:3000/', {});
    }
    return this._socket;
  }

  disconnect(): void {
    const socket = this._checkIfConnected();
    socket.disconnect();
    for (const [, $event] of this._events) {
      $event.complete();
    }
  }

  fromEvent<T>(eventName: string): Observable<T> {
    if (this._events.has(eventName)) {
      return this._events.get(eventName)!.asObservable();
    }
    const socket = this._checkIfConnected();
    const event$ = new Subject<T>();
    socket.on(eventName, (data: T) => {
      event$.next(data);
    });
    return event$.asObservable().pipe(shareReplay());
  }

  fromEventOnce<T>(eventName: string): Observable<T> {
    const event$ = new Subject<T>();
    const socket = this._checkIfConnected();
    socket.on(eventName, (data: T) => {
      event$.next(data);
      event$.complete();
    });
    return event$.asObservable();
  }
}

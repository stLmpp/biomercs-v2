import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { Socket } from 'socket.io-client';

export class SocketIO {
  constructor(private socket: typeof Socket) {}

  private _events = new Map<string, Subject<any>>();

  disconnect$ = new Subject();

  disconnect(): void {
    this.socket.disconnect();
    this.disconnect$.next();
    this.disconnect$.complete();
    for (const [, $event] of this._events) {
      $event.complete();
    }
  }

  fromEvent<T>(eventName: string): Observable<T> {
    if (this._events.has(eventName)) {
      return this._events.get(eventName)!.asObservable();
    }
    const event$ = new Subject<T>();
    this.socket.on(eventName, (data: T) => {
      event$.next(data);
    });
    return event$.asObservable().pipe(shareReplay());
  }

  fromEventOnce<T>(eventName: string): Observable<T> {
    const event$ = new Subject<T>();
    this.socket.on(eventName, (data: T) => {
      event$.next(data);
      event$.complete();
    });
    return event$.asObservable();
  }
}

@Injectable({ providedIn: 'root' })
export class SocketIOService {
  private _socketMap = new Map<string, SocketIO>();

  connect(host: string): SocketIO {
    if (this._socketMap.has(host)) {
      return this._socketMap.get(host)!;
    }
    const socket = new SocketIO(io('http://localhost:3000', {}));
    this._socketMap.set(host, socket);
    socket.disconnect$.pipe(take(1)).subscribe(() => {
      this._socketMap.delete(host);
    });
    return socket;
  }
}

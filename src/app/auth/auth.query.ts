import { Injectable } from '@angular/core';
import { Query } from '@stlmpp/store';
import { AuthStore } from './auth.store';
import { Auth } from '../model/auth';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Player } from '../model/player';
import { Observable } from 'rxjs';
import { isNumber } from '@stlmpp/utils';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  constructor(private authStore: AuthStore) {
    super(authStore);
  }

  isLogged$ = this.select('user').pipe(map(user => !!user?.id && !!user.token));
  user$ = this.select('user');

  selectIsAdmin(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user?.admin));
  }

  getToken(): string {
    return this.getUser()?.token ?? '';
  }

  getIsAdmin(): boolean {
    return !!this.getUser()?.admin;
  }

  getUser(): User | null {
    return this.getState().user;
  }

  selectIsSameAsLogged(value: number | Player): Observable<boolean> {
    const idPlayer = isNumber(value) ? value : value.id;
    return this.user$.pipe(map(user => user?.player?.id === idPlayer));
  }
}

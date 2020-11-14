import { Injectable } from '@angular/core';
import { Query } from '@stlmpp/store';
import { AuthStore } from './auth.store';
import { Auth } from '../model/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  constructor(private authStore: AuthStore) {
    super(authStore);
  }

  isLogged$ = this.select('user').pipe(map(user => !!user?.id && !!user.token));
  user$ = this.select('user');

  getIsLogged(): boolean {
    const user = this.getState().user;
    return !!user?.id && !!user.token;
  }

  getToken(): string {
    return this.getState().user?.token ?? '';
  }

  getIsAdmin(): boolean {
    return !!this.getState().user?.admin;
  }
}

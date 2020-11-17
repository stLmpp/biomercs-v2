import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCredentialsDto, AuthRegisterDto, AuthRegisterResponse } from '../model/auth';
import { User } from '../model/user';
import { map, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { catchAndThrow } from '../util/operators/catchError';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  endPoint = 'auth';

  register(dto: AuthRegisterDto): Observable<AuthRegisterResponse> {
    return this.http.post<AuthRegisterResponse>(`${this.endPoint}/register`, dto);
  }

  login(dto: AuthCredentialsDto): Observable<User> {
    return this.http.post<User>(`${this.endPoint}/login`, dto).pipe(
      tap(user => {
        this.authStore.update({ user });
      })
    );
  }

  autoLogin(): Observable<User> {
    return this.http.post<User>(`${this.endPoint}/auto-login`, undefined).pipe(
      tap(user => {
        this.authStore.update({ user });
      }),
      catchAndThrow(() => {
        this.authStore.update({ user: null });
      })
    );
  }

  resendCode(idUser: number): Observable<void> {
    return this.http.post<void>(`${this.endPoint}/user/${idUser}/resend-code`, undefined);
  }

  confirmCode(idUser: number, code: number): Observable<User> {
    return this.http.post<User>(`${this.endPoint}/user/${idUser}/confirm-code/${code}`, undefined).pipe(
      tap(user => {
        this.authStore.update({ user });
      })
    );
  }
}

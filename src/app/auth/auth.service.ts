import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthCredentialsDto, AuthRegisterDto, AuthRegisterResponse, SteamLoggedEvent } from '../model/auth';
import { User } from '../model/user';
import { filter, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { catchAndThrow } from '../util/operators/catchError';
import { SocketIOService } from '../shared/socket-io/socket-io.service';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { HttpParams } from '../util/http-params';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStore, private socketIOService: SocketIOService) {}

  endPoint = 'auth';

  register(dto: AuthRegisterDto): Observable<AuthRegisterResponse> {
    return this.http.post<AuthRegisterResponse>(`${this.endPoint}/register`, dto, {
      headers: AuthErrorInterceptor.ignoreHeaders,
    });
  }

  login(dto: AuthCredentialsDto): Observable<User> {
    return this.http
      .post<User>(`${this.endPoint}/login`, dto, { headers: AuthErrorInterceptor.ignoreHeaders })
      .pipe(
        tap(user => {
          this.authStore.update({ user });
        })
      );
  }

  autoLogin(): Observable<User> {
    return this.http
      .post<User>(`${this.endPoint}/auto-login`, undefined, { headers: AuthErrorInterceptor.ignoreHeaders })
      .pipe(
        tap(user => {
          this.authStore.update({ user });
        }),
        catchAndThrow(() => {
          this.authStore.update({ user: null });
          return of(null);
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

  loginSteam(uuid: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<string>(`${this.endPoint}/login-steam/${uuid}`, undefined, {
      responseType: 'text',
      headers,
    } as any) as any;
  }

  loginSteamSocket(uuid: string): Observable<SteamLoggedEvent> {
    return this.socketIOService
      .fromEvent<SteamLoggedEvent>(SteamLoggedEvent.namespace, SteamLoggedEvent.eventName)
      .pipe(filter(event => event.uuid === uuid));
  }

  updateToken(token: string): Observable<User> {
    this.authStore.update(state => ({ ...state, user: { token } as any }));
    return this.autoLogin();
  }

  logout(): void {
    this.authStore.update({ user: null });
  }

  forgotPassword(email: string): Observable<void> {
    const params = new HttpParams({ email });
    return this.http.post<void>(`${this.endPoint}/forgot-password`, undefined, { params });
  }

  changeForgottenPassword(confirmationCode: number, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.endPoint}/forgot-password/change-password`, { confirmationCode, password })
      .pipe(
        tap(user => {
          this.authStore.update({ user });
        })
      );
  }
}

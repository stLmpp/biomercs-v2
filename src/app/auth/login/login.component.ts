import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Control, ControlGroup, Validators } from '@stlmpp/control';
import { AuthCredentialsDto } from '../../model/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { WINDOW } from '../../core/window.service';
import { v4 } from 'uuid';
import { filter, finalize, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Destroyable } from '../../shared/destroyable-component';
import { DialogService } from '../../shared/components/modal/dialog/dialog.service';
import { Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'bio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Destroyable implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(WINDOW) private window: Window,
    private dialogService: DialogService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    super();
  }

  loadingLoginSteam$ = new BehaviorSubject<boolean>(false);
  loadingLogin$ = new BehaviorSubject<boolean>(false);
  typePassword = 'password';
  error$ = new BehaviorSubject<string | null>(null);

  form = new ControlGroup<AuthCredentialsDto>({
    rememberMe: new Control(true),
    password: new Control('', [Validators.required]),
    username: new Control('', [Validators.required]),
  });

  loginSteam(): void {
    this.loadingLoginSteam$.next(true);
    const uuid = v4();
    this.authService
      .loginSteam(uuid)
      .pipe(
        switchMap(url => {
          this.loadingLoginSteam$.next(false);
          const windowSteam = this.window.open(url, 'Login Steam', 'width=500');
          return this.authService.loginSteamSocket(uuid).pipe(
            takeUntil(this.destroy$),
            switchMap(({ token, error }) => {
              let request$: Observable<any>;
              if (error) {
                request$ = this.dialogService.confirm({
                  title: 'Something went wrong',
                  content: error,
                  btnYes: 'Ok',
                  btnNo: null,
                });
              } else {
                request$ = this.authService.updateToken(token);
              }
              return request$.pipe(
                finalize(() => {
                  windowSteam?.close();
                }),
                tap(() => {
                  this.router.navigate(['/']).then();
                  this.snackBarService.open('Login successful!');
                })
              );
            })
          );
        }),
        finalize(() => {
          this.loadingLoginSteam$.next(false);
        })
      )
      .subscribe();
  }

  login(): void {
    this.loadingLogin$.next(true);
    const credentials = this.form.value;
    this.form.disable();
    this.authService
      .login(credentials)
      .pipe(
        finalize(() => {
          this.loadingLogin$.next(false);
          this.form.enable();
        }),
        catchAndThrow(error => {
          this.error$.next(error.message);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']).then();
        this.snackBarService.open('Login successful!');
      });
  }

  ngOnInit(): void {
    this.form.value$
      .pipe(withLatestFrom(this.error$))
      .pipe(
        takeUntil(this.destroy$),
        filter(([_, error]) => !!error)
      )
      .subscribe(() => {
        this.error$.next(null);
      });
  }
}

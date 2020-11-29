import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Control, ControlGroup, Validators } from '@stlmpp/control';
import { AuthCredentialsDto } from '../../model/auth';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { WINDOW } from '../../core/window.service';
import { filter, finalize, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Destroyable } from '../../shared/destroyable-component';
import { DialogService } from '../../shared/components/modal/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';
import { ModalService } from '../../shared/components/modal/modal.service';
import { LoginConfirmCodeModalComponent } from '../login-confirm-code-modal/login-confirm-code-modal.component';
import { HttpStatusCode } from '../../model/http-code.enum';
import { HttpError } from '../../model/http-error';

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
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
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
    this.authService
      .loginSteam(['../', 'steam'], this.activatedRoute)
      .pipe(
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
        catchAndThrow((error: HttpError<number>) => {
          this.error$.next(error.message);
          if (error.status === HttpStatusCode.PreconditionFailed) {
            this.modalService.open<LoginConfirmCodeModalComponent, number>(LoginConfirmCodeModalComponent, {
              data: error.extra,
              disableClose: true,
            });
          }
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

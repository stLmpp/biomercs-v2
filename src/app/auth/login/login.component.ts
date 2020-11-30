import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Control, ControlGroup, Validators } from '@stlmpp/control';
import { AuthCredentialsDto } from '../../model/auth';
import { AuthService } from '../auth.service';
import { WINDOW } from '../../core/window.service';
import { filter, finalize, takeUntil, withLatestFrom } from 'rxjs/operators';
import { DialogService } from '../../shared/components/modal/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';
import { ModalService } from '../../shared/components/modal/modal.service';
import { LoginConfirmCodeModalComponent } from '../login-confirm-code-modal/login-confirm-code-modal.component';
import { HttpStatusCode } from '../../model/http-code.enum';
import { HttpError } from '../../model/http-error';
import { StateComponent } from '../../shared/state-component';

@Component({
  selector: 'bio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent
  extends StateComponent<{ loadingSteam: boolean; loading: boolean; error: string | null }>
  implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(WINDOW) private window: Window,
    private dialogService: DialogService,
    private router: Router,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
    super({ error: null, loading: false, loadingSteam: false });
  }

  loading$ = this.selectStateMulti(['loading', 'loadingSteam']);
  typePassword = 'password';
  error$ = this.selectState('error');

  form = new ControlGroup<AuthCredentialsDto>({
    rememberMe: new Control(true),
    password: new Control('', [Validators.required]),
    username: new Control('', [Validators.required]),
  });

  loginSteam(): void {
    this.updateState('loadingSteam', true);
    this.authService
      .loginSteam(['../', 'steam'], this.activatedRoute)
      .pipe(
        finalize(() => {
          this.updateState('loadingSteam', false);
        })
      )
      .subscribe();
  }

  login(): void {
    this.updateState('loading', true);
    const credentials = this.form.value;
    this.form.disable();
    this.authService
      .login(credentials)
      .pipe(
        finalize(() => {
          this.updateState('loading', false);
          this.form.enable();
        }),
        catchAndThrow((error: HttpError<number>) => {
          this.updateState('error', error.message);
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
        this.updateState('error', null);
      });
  }
}

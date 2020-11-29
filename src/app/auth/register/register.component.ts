import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { AuthRegisterDto, AuthRegisterResponse } from '../../model/auth';
import { ControlBuilder, Validators } from '@stlmpp/control';
import { User } from '../../model/user';
import { catchAndThrow } from '../../util/operators/catchError';
import { EmailExistsValidator } from '../../shared/validators/email-exists.validator';
import { UsernameExistsValidator } from '../../shared/validators/username-exists.validator';

interface AuthRegisterForm extends AuthRegisterDto {
  confirmPassword: string;
  code: number;
}

@Component({
  selector: 'bio-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private controlBuilder: ControlBuilder,
    private router: Router,
    private emailExistsValidator: EmailExistsValidator,
    private usernameExistsValidator: UsernameExistsValidator
  ) {}

  private _idUser = 0;

  loadingSteam$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  hidePassword = true;
  hideConfirmPassword = true;
  emailSent$ = new BehaviorSubject(false);
  errorConfirmationCode$ = new BehaviorSubject<string | null>(null);

  form = this.controlBuilder.group<AuthRegisterForm>({
    username: [null, [Validators.required, Validators.minLength(3), this.usernameExistsValidator]],
    password: [null, [Validators.required, Validators.minLength(6), Validators.sibblingEquals('confirmPassword')]],
    email: [null, [Validators.required, Validators.email, this.emailExistsValidator]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.sibblingEquals('password')]],
    code: [],
  });

  registerSteam(): void {
    this.loadingSteam$.next(true);
    this.authService
      .loginSteam(['../', 'steam'], this.activatedRoute, true, this.form.get('email').value)
      .pipe(
        finalize(() => {
          this.loadingSteam$.next(false);
        })
      )
      .subscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading$.next(true);
    this.form.disable();
    let request$: Observable<AuthRegisterResponse | User>;
    if (this.emailSent$.value) {
      this.errorConfirmationCode$.next(null);
      // Can't be here if code is null or undefined
      request$ = this.authService.confirmCode(this._idUser, this.form.get('code').value!).pipe(
        tap(() => {
          this.router.navigate(['/']).then();
        }),
        catchAndThrow(err => {
          this.errorConfirmationCode$.next(err.message);
        })
      );
    } else {
      const { email, password, username } = this.form.value;
      request$ = this.authService.register({ email, password, username }).pipe(
        tap(response => {
          this._idUser = response.idUser;
          this.emailSent$.next(true);
          this.form.get('code').setValidator(Validators.required);
        })
      );
    }
    request$
      .pipe(
        finalize(() => {
          this.loading$.next(false);
          this.form.enable();
        })
      )
      .subscribe();
  }
}

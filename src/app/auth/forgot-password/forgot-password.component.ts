import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Control, ControlGroup, Validators } from '@stlmpp/control';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';
import { User } from '../../model/user';

interface ForgotPasswordForm {
  email: string;
  code: number;
  password: string;
}

@Component({
  selector: 'bio-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthService, private router: Router, private snackBarService: SnackBarService) {}

  emailForm = new ControlGroup<ForgotPasswordForm>({
    email: new Control('', [Validators.required, Validators.email]),
    password: new Control(),
    code: new Control(),
  });

  loading$ = new BehaviorSubject(false);
  emailSent$ = new BehaviorSubject(false);

  submit(): void {
    this.loading$.next(true);
    this.emailForm.disable();
    let request$: Observable<void | User>;
    if (this.emailSent$.value) {
      const { password, code } = this.emailForm.value;
      request$ = this.authService.changeForgottenPassword(code, password).pipe(
        tap(() => {
          this.router.navigate(['/']).then();
          this.snackBarService.open('Password changed successfully');
        })
      );
    } else {
      const { email } = this.emailForm.value;
      request$ = this.authService.forgotPassword(email).pipe(
        tap(() => {
          this.emailForm.get('password').setValidator(Validators.required);
          this.emailForm.get('code').setValidator(Validators.required);
          this.emailSent$.next(true);
        })
      );
    }
    request$.pipe(
      finalize(() => {
        this.loading$.next(false);
        this.emailForm.enable();
      }),
      catchAndThrow(error => {
        this.snackBarService.open(error.message);
      })
    );
  }
}

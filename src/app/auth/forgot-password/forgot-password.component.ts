import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Control, ControlGroup, Validators } from '@stlmpp/control';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';

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
    if (this.emailSent$.value) {
      const { password, code } = this.emailForm.value;
      this.authService
        .changeForgottenPassword(code, password)
        .pipe(
          finalize(() => {
            this.loading$.next(false);
          }),
          catchAndThrow(error => {
            this.snackBarService.open(error.message);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/']).then();
        });
    } else {
      const { email } = this.emailForm.value;
      this.authService
        .forgotPassword(email)
        .pipe(
          finalize(() => {
            this.loading$.next(false);
          }),
          catchAndThrow(error => {
            this.snackBarService.open(error.message);
          })
        )
        .subscribe(() => {
          this.emailForm.get('password').setValidator(Validators.required);
          this.emailForm.get('code').setValidator(Validators.required);
          this.emailSent$.next(true);
        });
    }
  }
}

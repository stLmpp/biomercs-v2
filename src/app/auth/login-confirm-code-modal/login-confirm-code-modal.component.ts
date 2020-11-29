import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ControlBuilder, Validators } from '@stlmpp/control';
import { ModalRef } from '../../shared/components/modal/modal-ref';
import { MODAL_DATA } from '../../shared/components/modal/modal.config';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchAndThrow } from '../../util/operators/catchError';

interface LoginConfirmationForm {
  code: number;
}

@Component({
  selector: 'bio-login-confirm-code-modal',
  templateUrl: './login-confirm-code-modal.component.html',
  styleUrls: ['./login-confirm-code-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginConfirmCodeModalComponent {
  constructor(
    public modalRef: ModalRef<LoginConfirmCodeModalComponent, number>,
    private controlBuilder: ControlBuilder,
    @Inject(MODAL_DATA) private idUser: number,
    private authService: AuthService,
    private router: Router
  ) {}

  form = this.controlBuilder.group<LoginConfirmationForm>({ code: [null, [Validators.required]] });
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.error$.next(null);
    this.loading$.next(true);
    this.form.disable();
    const { code } = this.form.value;
    this.authService
      .confirmCode(this.idUser, code)
      .pipe(
        finalize(() => {
          this.loading$.next(false);
          this.form.enable();
        }),
        tap(() => {
          this.modalRef.close();
          this.router.navigate(['/']).then();
        }),
        catchAndThrow(err => {
          this.error$.next(err.message);
        })
      )
      .subscribe();
  }
}

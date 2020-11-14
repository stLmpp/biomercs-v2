import { Injectable } from '@angular/core';
import { HttpError } from '../../model/http-error';
import { OperatorFunction } from 'rxjs';
import { catchAndThrow } from '../../util/operators/catchError';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';
import { ModalService } from '../../shared/components/modal/modal.service';
import { ErrorComponent } from './error.component';
import { take } from 'rxjs/operators';
import { AuthQuery } from '../../auth/auth.query';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
  constructor(
    private snackBarService: SnackBarService,
    private modalService: ModalService,
    private authQuery: AuthQuery
  ) {}

  private _snackBar(message: string, button: string, data: HttpError, isAdmin: boolean): void {
    const snack = this.snackBarService.open(message, { action: button });
    if (isAdmin) {
      snack.onAction$.pipe(take(1)).subscribe(() => {
        this.modalService.open(ErrorComponent, { data });
      });
    }
  }

  handleErrorOperator<T>(): OperatorFunction<T, T> {
    return catchAndThrow(httpError => {
      const isAdmin = this.authQuery.getIsAdmin();
      let message: string;
      const button = isAdmin ? 'Show more info' : 'Close';
      switch (httpError.status) {
        case 400:
          message = 'The data sent was wrong, bad request';
          break;
        case 404:
          message = 'The data was not found, 404';
          break;
        case 409:
          message = `Can't finish operation because of relations`;
          break;
        default:
          message = 'Internal error';
          break;
      }
      this._snackBar(message, button, httpError, isAdmin);
    });
  }
}

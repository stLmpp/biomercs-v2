import { Injectable } from '@angular/core';
import { HttpError } from '../../model/http-error';
import { take } from 'rxjs/operators';
import { ErrorComponent } from './error.component';
import { OperatorFunction } from 'rxjs';
import { catchAndThrow } from '../../util/operators/catchError';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
  constructor() {}

  handleErrorOperator<T>(): OperatorFunction<T, T> {
    return catchAndThrow(err => {
      const isAdmin = true; // TODO
      let message: string;
      const button = isAdmin ? 'Show more info' : 'Close';
      switch (err.status) {
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
      this.snackBar(message, button, err, isAdmin);
    });
  }

  private snackBar(message: string, button: string, err: HttpError, isAdmin: boolean): void {
    // const snack = this.matSnackBar.open(message, button);
    // if (isAdmin) {
    //   snack
    //     .onAction()
    //     .pipe(take(1))
    //     .subscribe(() => {
    //       this.matDialog.open(ErrorComponent, { data: err });
    //     });
    // }
  }
}

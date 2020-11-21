import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ModalRef } from '../modal-ref';
import { BehaviorSubject, isObservable, Observable } from 'rxjs';
import { MODAL_DATA } from '../modal.config';
import { take, takeUntil } from 'rxjs/operators';
import { Destroyable } from '../../../destroyable-component';
import { catchAndThrow } from '../../../../util/operators/catchError';

export interface DialogData {
  title?: string | null;
  content: string | SafeHtml;
  btnYes?: string | null;
  btnNo?: string | null;
  yesObservable?: Observable<any>;
  noObservable?: Observable<any>;
}

@Component({
  selector: 'bio-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent extends Destroyable {
  constructor(
    private modalRef: ModalRef<DialogComponent, DialogData, boolean>,
    @Inject(MODAL_DATA) public data: DialogData
  ) {
    super();
  }

  loading$ = new BehaviorSubject<boolean>(false);

  yes(): void {
    if (isObservable(this.data.yesObservable)) {
      this.loading$.next(true);
      this.data.yesObservable
        .pipe(
          take(1),
          takeUntil(this.destroy$),
          catchAndThrow(() => {
            this.loading$.next(false);
          })
        )
        .subscribe(() => {
          this.loading$.next(false);
          this.modalRef.close(true);
        });
    } else {
      this.modalRef.close(true);
    }
  }

  no(): void {
    if (isObservable(this.data.noObservable)) {
      this.loading$.next(true);
      this.data.noObservable
        .pipe(
          take(1),
          takeUntil(this.destroy$),
          catchAndThrow(() => {
            this.loading$.next(false);
          })
        )
        .subscribe(() => {
          this.loading$.next(false);
          this.modalRef.close(false);
        });
    } else {
      this.modalRef.close(false);
    }
  }
}

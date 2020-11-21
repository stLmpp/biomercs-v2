import { Injectable } from '@angular/core';
import { ModalService } from '../modal.service';
import { ModalRef } from '../modal-ref';
import { DialogComponent, DialogData } from './dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private modalService: ModalService) {}

  private _getModalRef(data: DialogData): ModalRef<DialogComponent, DialogData, boolean> {
    return this.modalService.open(DialogComponent, {
      panelClass: 'dialog',
      data: { btnYes: 'Yes', btnNo: 'No', ...data },
    });
  }

  confirm(data: DialogData): Observable<boolean> {
    return this._getModalRef(data).onClose$.pipe(map(Boolean));
  }
}

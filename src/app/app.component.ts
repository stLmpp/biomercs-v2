import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from './components/modal/modal.service';
import { ErrorComponent } from './core/error/error.component';
import { HttpError } from './model/http-error';
import { SnackBarService } from './components/snack-bar/snack-bar.service';

@Component({
  selector: 'bio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private modalService: ModalService, private snackBarService: SnackBarService) {}

  loading$ = new BehaviorSubject<boolean>(false);

  open(): void {
    this.snackBarService.open('teste A A A AASF', {
      timeout: 0,
    });
  }

  openModal(): void {
    this.modalService.open(ErrorComponent, {
      data: { error: 'Error', message: 'Message', sqlErrono: 123, sqlMessage: 'SqlMessage', status: 500 } as HttpError,
    });
  }
}

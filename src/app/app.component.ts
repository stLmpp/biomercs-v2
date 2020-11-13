import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from './components/modal/modal.service';
import { ErrorComponent } from './core/error/error.component';
import { HttpError } from './model/http-error';

@Component({
  selector: 'bio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private modalService: ModalService) {}

  loading$ = new BehaviorSubject<boolean>(false);

  open(): void {
    this.modalService.open(ErrorComponent, {
      data: { error: 'Teste', message: 'Teste', sqlErrono: 0, sqlMessage: 'SQL', status: 400 } as HttpError,
    });
  }
}

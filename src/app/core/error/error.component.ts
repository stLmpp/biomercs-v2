import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { HttpError } from '../../model/http-error';
import { MODAL_DATA } from '../../components/modal/modal.config';

@Component({
  selector: 'bio-error',
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  constructor(@Inject(MODAL_DATA) public httpError: HttpError) {}

  ngOnInit(): void {}
}

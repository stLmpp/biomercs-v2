import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bio-error',
  templateUrl: './error.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  constructor() {} // TODO Inject MODAL DATA

  ngOnInit(): void {}
}

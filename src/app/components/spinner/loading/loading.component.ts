import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  static ngAcceptInputType_noBox: BooleanInput;

  constructor() {}

  @Input()
  get noBox(): boolean {
    return this._noBox;
  }
  set noBox(noBox: boolean) {
    this._noBox = coerceBooleanProperty(noBox);
  }
  private _noBox = false;

  @Input() show = false;

  ngOnInit(): void {}
}

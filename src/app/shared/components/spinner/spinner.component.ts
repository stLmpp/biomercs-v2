import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit, OnChanges {
  @Input()
  set size(size: number) {
    size = coerceNumberProperty(size);
    if (size > 1 || !size) {
      size = 1;
    }
    this._size = size;
  }
  get size(): number {
    return this._size;
  }
  private _size = 1;

  @Input() baseSize = 200;
  @Input() small: BooleanInput;
  @Input() medium: BooleanInput;
  @Input() large: BooleanInput;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.small && coerceBooleanProperty(changes.small.currentValue)) {
      this.size = 0.15;
    }
    if (changes.medium && coerceBooleanProperty(changes.medium.currentValue)) {
      this.size = 0.3;
    }
    if (changes.large && coerceBooleanProperty(changes.large.currentValue)) {
      this.size = 0.6;
    }
  }

  static ngAcceptInputType_small: BooleanInput;
  static ngAcceptInputType_medium: BooleanInput;
  static ngAcceptInputType_large: BooleanInput;
  static ngAcceptInputType_size: NumberInput;
}

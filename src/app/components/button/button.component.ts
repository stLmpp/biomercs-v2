import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AbstractComponent } from '../core/abstract-component';
import { fadeInOutAnimation } from '../../shared/animations/fade';

@Component({
  selector: 'button[bioButton],a[bioButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'button' },
  animations: [fadeInOutAnimation()],
})
export class ButtonComponent extends AbstractComponent implements OnInit {
  get disabledClass(): boolean | null {
    return !!(this.loading || this.disabled) || null;
  }

  @HostBinding('attr.tabindex')
  get tabindex(): number {
    return this.disabledClass ? -1 : this.tabIndex || 0;
  }

  @Input() @HostBinding('class.loading') loading: BooleanInput;
  @Input() tabIndex = 0;

  @Input() icon: BooleanInput;

  @HostBinding('class.icon')
  get isIcon(): boolean {
    return coerceBooleanProperty(this.icon);
  }

  @Input() fab: BooleanInput;

  @HostBinding('class.fab')
  get isFab(): boolean {
    return coerceBooleanProperty(this.fab);
  }

  ngOnInit(): void {}
}

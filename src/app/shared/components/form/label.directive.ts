import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: 'label' })
export class LabelDirective {
  @Input() @HostBinding('attr.for') for?: string | number;
}

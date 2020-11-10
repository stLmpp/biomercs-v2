import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bioScroll]',
})
export class BioScrollDirective {
  constructor() {}

  @Input() disabled?: boolean;

  @HostBinding('class.bio-scroll')
  get bioScroll(): boolean {
    return !this.disabled;
  }
}

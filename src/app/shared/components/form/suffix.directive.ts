import { Directive } from '@angular/core';

@Directive({
  selector: '[suffix]',
  host: { class: 'suffix' },
})
export class FormFieldSuffixDirective {}

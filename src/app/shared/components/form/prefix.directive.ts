import { Directive } from '@angular/core';

@Directive({
  selector: '[prefix]',
  host: { class: 'prefix' },
})
export class FormFieldPrefixDirective {}

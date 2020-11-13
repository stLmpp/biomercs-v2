import { Directive } from '@angular/core';

@Directive({
  selector: '[cardActions], card-actions',
  host: { class: 'card-actions' },
})
export class CardActionsDirective {}

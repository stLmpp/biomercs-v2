import { Component, ViewEncapsulation } from '@angular/core';
import { Animations } from '../../animations/animations';

@Component({
  selector: 'error',
  template: '<ng-content></ng-content>',
  host: { class: 'error', '[@slideIn]': '' },
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.slide.in()],
})
export class FormFieldErrorComponent {}

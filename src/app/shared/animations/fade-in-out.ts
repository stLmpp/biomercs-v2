import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export function fadeInOutAnimation(ms = 200): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [style({ opacity: 0 }), animate(ms, style({ opacity: 1 }))]),
    transition(':leave', [animate(ms, style({ opacity: 0 }))]),
  ]);
}

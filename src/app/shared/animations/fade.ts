import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeInOutAnimation(ms = 200): AnimationTriggerMetadata {
  return trigger('fadeInOut', [fadeIn(ms), fadeOut(ms)]);
}

export function fadeInAnimation(ms = 200): AnimationTriggerMetadata {
  return trigger('fadeIn', [fadeIn(ms)]);
}

export function fadeOutAnimation(ms = 200): AnimationTriggerMetadata {
  return trigger('fadeOut', [fadeOut(ms)]);
}

function fadeIn(ms = 200): AnimationTransitionMetadata {
  return transition(':enter', [style({ opacity: 0 }), animate(ms, style({ opacity: 1 }))]);
}

function fadeOut(ms = 200): AnimationTransitionMetadata {
  return transition(':leave', [animate(ms, style({ opacity: 0 }))]);
}

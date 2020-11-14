import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function scaleInOutAnimation(ms = 100): AnimationTriggerMetadata {
  return trigger('scaleInOut', [scaleIn(ms), scaleOut(ms)]);
}

export function scaleInAnimation(ms = 100): AnimationTriggerMetadata {
  return trigger('scaleIn', [scaleIn(ms)]);
}

export function scaleOutAnimation(ms = 100): AnimationTriggerMetadata {
  return trigger('scaleOut', [scaleOut(ms)]);
}

function scaleOut(ms = 100): AnimationTransitionMetadata {
  return transition(':leave', [animate(ms, style({ transform: 'scale(0)' }))]);
}

function scaleIn(ms = 100): AnimationTransitionMetadata {
  return transition(':enter', [style({ transform: 'scale(0)' }), animate(ms, style({ transform: 'scale(1)' }))]);
}

import {
  animate,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class ScaleAnimations {
  static outTransition(ms = 100): AnimationTransitionMetadata {
    return transition(':leave', [animate(ms, style({ transform: 'scale(0)' }))]);
  }
  static inTransition(ms = 100): AnimationTransitionMetadata {
    return transition(':enter', [style({ transform: 'scale(0)' }), animate(ms, style({ transform: 'scale(1)' }))]);
  }
  static inOut(ms = 100): AnimationTriggerMetadata {
    return trigger('scaleInOut', [ScaleAnimations.inTransition(ms), ScaleAnimations.outTransition(ms)]);
  }
  static in(ms = 100): AnimationTriggerMetadata {
    return trigger('scaleIn', [ScaleAnimations.inTransition(ms)]);
  }
  static out(ms = 100): AnimationTriggerMetadata {
    return trigger('scaleOut', [ScaleAnimations.outTransition(ms)]);
  }
}

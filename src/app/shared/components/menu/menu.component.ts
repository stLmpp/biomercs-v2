import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Animations } from '../../animations/animations';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { MenuItem } from './menu-item';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'bio-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'bio-menu',
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.fade.inOut(100), Animations.scale.in(100, 0.8)],
})
export class MenuComponent {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

  @ContentChildren(MenuItem, { descendants: true }) menuItens!: QueryList<MenuItem>;

  overlayRef?: OverlayRef;
  trigger?: 'hover' | 'click';

  focusManager?: FocusKeyManager<MenuItem>;

  onMouseleave(): void {
    if (this.trigger === 'hover') {
      this.onClose();
    }
  }

  onClose(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  onFadeDone($event: AnimationEvent): void {
    if (this.overlayRef && $event.toState === 'void') {
      this.overlayRef?.dispose();
    }
  }

  initFocus(): void {
    this.focusManager = new FocusKeyManager(this.menuItens)
      .withWrap()
      .withVerticalOrientation()
      .skipPredicate((element: MenuItem) => element.isDisabled());
    this.focusManager?.setFirstItemActive();
  }
}

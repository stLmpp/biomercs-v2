import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Animations } from '../../animations/animations';

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

  overlayRef?: OverlayRef;
  trigger?: 'hover' | 'click';

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
}

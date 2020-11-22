import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { MenuComponent } from './menu.component';
import { Overlay } from '@angular/cdk/overlay';
import { cdkOverlayTransparentBackdrop, overlayPositions } from '../../../util/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Destroyable } from '../../destroyable-component';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[menuTrigger]',
})
export class MenuTriggerDirective extends Destroyable implements OnDestroy {
  constructor(private overlay: Overlay, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {
    super();
  }

  @Input() menuTrigger!: MenuComponent;
  @Input() trigger: 'hover' | 'click' = 'click';

  opened = false;

  private _isClick(): boolean {
    return this.trigger === 'click';
  }

  private _createOverlay(): void {
    if (this.opened) {
      return;
    }
    const overlayRef = this.overlay.create({
      scrollStrategy: this._isClick()
        ? this.overlay.scrollStrategies.block()
        : this.overlay.scrollStrategies.close({ threshold: 5 }),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef.nativeElement)
        .withPositions([
          { ...overlayPositions.bottom, offsetY: 2, overlayX: 'start', originX: 'start' },
          { ...overlayPositions.bottom, offsetY: 2, overlayX: 'end', originX: 'end' },
          { ...overlayPositions.top, offsetY: -2, overlayX: 'start', originX: 'start' },
          { ...overlayPositions.top, offsetY: -2, overlayX: 'end', originX: 'end' },
        ]),
      hasBackdrop: this._isClick(),
      backdropClass: cdkOverlayTransparentBackdrop,
    });
    overlayRef
      .detachments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.opened = false;
      });
    overlayRef
      .backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.opened = false;
        overlayRef?.detach();
      });
    this.menuTrigger.overlayRef = overlayRef;
    this.menuTrigger.trigger = this.trigger;
    const templatePortal = new TemplatePortal(this.menuTrigger.templateRef, this.viewContainerRef);
    overlayRef.attach(templatePortal);
    this.opened = true;
  }

  @HostListener('mouseenter')
  onMouseenter(): void {
    if (this.trigger !== 'hover') {
      return;
    }
    this._createOverlay();
  }

  @HostListener('click')
  onClick(): void {
    if (this.trigger !== 'click') {
      return;
    }
    this._createOverlay();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

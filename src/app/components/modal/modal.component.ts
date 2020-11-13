import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { MODAL_LAST_FOCUSED_ELEMENT, ModalConfig } from './modal.config';
import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'modal',
  template: '<ng-template cdkPortalOutlet></ng-template>',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'modal', '[attr.modal]': `''` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent<R = any> implements OnInit, OnDestroy {
  constructor(
    private modalConfig: ModalConfig,
    private overlayRef: OverlayRef,
    @Inject(MODAL_LAST_FOCUSED_ELEMENT) private lastFocusedElement: Element | null,
    private configurableFocusTrapFactory: ConfigurableFocusTrapFactory,
    private elementRef: ElementRef
  ) {}

  _destroy$ = new Subject();

  private _focusTrap?: ConfigurableFocusTrap;

  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  @HostBinding('attr.id') get id(): string {
    return this.modalConfig.id;
  }

  attachTemplate<T>(templatePortal: TemplatePortal<T>): EmbeddedViewRef<T> {
    return this.portalOutlet.attachTemplatePortal(templatePortal);
  }

  attachComponent<T>(componentPortal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  private async initializeTrapFocus(): Promise<void> {
    this._focusTrap = this.configurableFocusTrapFactory.create(this.elementRef.nativeElement);
    if (this.modalConfig.autoFocus) {
      await this._focusTrap.focusInitialElementWhenReady();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.initializeTrapFocus();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (this.modalConfig.restoreFocus) {
      (this.lastFocusedElement as HTMLElement)?.focus?.();
    }
    this._focusTrap?.destroy();
  }
}

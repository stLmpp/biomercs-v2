import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { MenuComponent } from './menu.component';

@Directive()
export abstract class MenuItem implements FocusableOption {
  protected constructor(public menuComponent: MenuComponent, public elementRef: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.menuComponent.onClose();
  }

  @HostListener('keydown.enter')
  onKeydownEnter(): void {
    this.menuComponent.onClose();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  abstract isDisabled(): boolean;
}

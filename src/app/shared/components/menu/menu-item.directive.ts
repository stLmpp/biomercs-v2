import { Directive, Host, HostListener } from '@angular/core';
import { MenuComponent } from './menu.component';

@Directive({ selector: '[menuItem]', host: { class: 'menu-item' } })
export class MenuItemDirective {
  constructor(@Host() public menuComponent: MenuComponent) {}

  @HostListener('click')
  onClick(): void {
    this.menuComponent.onClose();
  }
}

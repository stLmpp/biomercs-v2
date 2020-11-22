import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';
import { MenuItemDirective } from './menu-item.directive';

@NgModule({
  declarations: [MenuTriggerDirective, MenuComponent, MenuItemDirective],
  imports: [CommonModule],
  exports: [MenuTriggerDirective, MenuComponent, MenuItemDirective],
})
export class MenuModule {}

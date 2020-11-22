import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { IconModule } from '../shared/components/icon/icon.module';
import { RouterModule } from '@angular/router';
import { NgLetModule } from '../shared/let/ng-let.module';
import { MenuModule } from '../shared/components/menu/menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ButtonModule, IconModule, RouterModule, NgLetModule, MenuModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}

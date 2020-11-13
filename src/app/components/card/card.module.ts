import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardTitleDirective } from './card-title.directive';
import { CardContentDirective } from './card-content.directive';
import { CardActionsDirective } from './card-actions.directive';

const DECLARATIONS = [CardComponent, CardTitleDirective, CardContentDirective, CardActionsDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule],
  exports: [...DECLARATIONS],
})
export class CardModule {}

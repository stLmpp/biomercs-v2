import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { BioScrollDirective } from './bio-scroll.directive';

@NgModule({
  imports: [SharedModule],
  declarations: [BioScrollDirective],
  exports: [BioScrollDirective],
})
export class ScrollModule {}

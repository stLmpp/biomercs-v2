import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';

const PIPES = [SearchPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
})
export class ArrayModule {}

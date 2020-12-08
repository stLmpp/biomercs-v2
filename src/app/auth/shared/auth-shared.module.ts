import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsSameAsLoggedPipe } from './is-same-as-logged.pipe';

const PIPES = [IsSameAsLoggedPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [CommonModule],
  exports: [...PIPES],
})
export class AuthSharedModule {}

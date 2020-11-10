import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgLetDirective } from './let/ng-let.directive';
import { CommonModule } from '@angular/common';
import { StUtilsModule } from '@stlmpp/utils';

const DIRECTIVES = [NgLetDirective];

const MODULES = [CommonModule];

@NgModule({
  imports: [...MODULES, StUtilsModule],
  declarations: [...DIRECTIVES],
  exports: [...MODULES, ...DIRECTIVES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalActionsDirective } from './modal-actions.directive';
import { ModalTitleDirective } from './modal-title.directive';
import { ModalContentDirective } from './modal-content.directive';
import { ModalComponent } from './modal.component';
import { PortalModule } from '@angular/cdk/portal';
import { ModalService } from './modal.service';
import { MODAL_DEFAULT_CONFIG, ModalConfig } from './modal.config';
import { ModalCloseDirective } from './modal-close.directive';
import { SharedModule } from '../../shared/shared.module';

const DECLARATIONS = [
  ModalActionsDirective,
  ModalTitleDirective,
  ModalContentDirective,
  ModalCloseDirective,
  ModalComponent,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [SharedModule, OverlayModule, PortalModule],
  exports: [...DECLARATIONS],
})
export class ModalModule {
  static forRoot(config?: ModalConfig): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        {
          provide: MODAL_DEFAULT_CONFIG,
          useValue: config ?? new ModalConfig<any>(),
        },
        ModalService,
      ],
    };
  }

  static forChild(config?: ModalConfig): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        {
          provide: MODAL_DEFAULT_CONFIG,
          useValue: config ?? new ModalConfig<any>(),
        },
      ],
    };
  }
}

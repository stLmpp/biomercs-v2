import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormModule } from '../shared/components/form/form.module';
import { CardModule } from '../shared/components/card/card.module';
import { StControlModule } from '@stlmpp/control';
import { ButtonModule } from '../shared/components/button/button.module';
import { IconModule } from '../shared/components/icon/icon.module';
import { DialogModule } from '../shared/components/modal/dialog/dialog.module';
import { CommonModule } from '@angular/common';
import { NgLetModule } from '../shared/let/ng-let.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {
  ConfirmationCodeInputComponent,
  ConfirmationCodeInputDirective,
} from './confirmation-code-input/confirmation-code-input.component';
import { SteamRegisterComponent } from './steam-register/steam-register.component';
import { ModalModule } from '../shared/components/modal/modal.module';
import { LoginConfirmCodeModalComponent } from './login-confirm-code-modal/login-confirm-code-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmationCodeInputComponent,
    ConfirmationCodeInputDirective,
    SteamRegisterComponent,
    LoginConfirmCodeModalComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormModule,
    CardModule,
    StControlModule,
    ButtonModule,
    IconModule,
    DialogModule,
    NgLetModule,
    ModalModule,
  ],
})
export class AuthModule {}

import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { FormModule } from '../shared/components/form/form.module';
import { CardModule } from '../shared/components/card/card.module';
import { StControlModule } from '@stlmpp/control';
import { ButtonModule } from '../shared/components/button/button.module';
import { IconModule } from '../shared/components/icon/icon.module';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { DialogModule } from '../shared/components/modal/dialog/dialog.module';
import { CommonModule } from '@angular/common';
import { NgLetModule } from '../shared/let/ng-let.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {
  ConfirmationCodeInputComponent,
  ConfirmationCodeInputDirective,
} from './confirmation-code-input/confirmation-code-input.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmationCodeInputComponent,
    ConfirmationCodeInputDirective,
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
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (authService: AuthService) => () => authService.autoLogin().toPromise(),
          deps: [AuthService],
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthErrorInterceptor,
          multi: true,
        },
      ],
    };
  }
}

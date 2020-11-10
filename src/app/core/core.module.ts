import { LOCALE_ID, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { WINDOW_PROVIDERS } from './window.service';
import { ApiInterceptor } from './api.interceptor';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { DateInterceptor } from './date.interceptor';
import { FormatErrorInterceptor } from './error/format-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { HandleErrorDevInterceptor } from './error/handle-error-dev.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AuthErrorInterceptor } from '../auth/auth-error.interceptor';

const withInterceptors = (...interceptors: any[]): Provider[] =>
  interceptors.map(useClass => ({
    provide: HTTP_INTERCEPTORS,
    useClass,
    multi: true,
  }));

@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [SharedModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'pt-BR',
        },
        ...WINDOW_PROVIDERS,
        ...withInterceptors(
          ApiInterceptor,
          LoadingInterceptor,
          DateInterceptor,
          FormatErrorInterceptor,
          AuthErrorInterceptor,
          HandleErrorDevInterceptor
        ),
      ],
    };
  }
}

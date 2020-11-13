import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        // { TODO
        //   provide: APP_INITIALIZER,
        //   useFactory: (authService: AuthService) => async () => {
        //     try {
        //       await authService.autoLogin().toPromise();
        //     } catch {}
        //   },
        //   deps: [AuthService],
        //   multi: true,
        // },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}

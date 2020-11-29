import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouteDataEnum, RouteParamEnum } from '../model/route-param.enum';
import { SteamRegisterComponent } from './steam-register/steam-register.component';
import { NotLoggedGuard } from './not-logged.guard';
import { SteamRegisterGuard } from './steam-register/steam-register.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: `steam/:${RouteParamEnum.steamid}`,
    canActivate: [NotLoggedGuard, SteamRegisterGuard],
    children: [
      {
        path: 'register',
        component: SteamRegisterComponent,
      },
      {
        path: 'confirm',
        component: SteamRegisterComponent,
        data: { [RouteDataEnum.confirm]: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

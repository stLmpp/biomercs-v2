import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouteParamEnum } from '../model/route-param.enum';
import { SteamRegisterComponent } from './steam-register/steam-register.component';
import { NotLoggedGuard } from './not-logged.guard';
import { SteamRegisterGuard } from './steam-register/steam-register.guard';

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
    path: `steam/:${RouteParamEnum.steamid}/register`,
    component: SteamRegisterComponent,
    canActivate: [NotLoggedGuard, SteamRegisterGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

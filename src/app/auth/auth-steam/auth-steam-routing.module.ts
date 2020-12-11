import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteamRegisterComponent } from './steam-register/steam-register.component';
import { RouteDataEnum, RouteParamEnum } from '../../model/route-param.enum';
import { SteamRegisterGuard } from './steam-register/steam-register.guard';

const routes: Routes = [
  {
    path: `:${RouteParamEnum.steamid}`,
    canActivate: [SteamRegisterGuard],
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
export class AuthSteamRoutingModule {}

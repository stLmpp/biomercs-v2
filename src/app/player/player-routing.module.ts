import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParamEnum } from '../model/route-param.enum';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePersonaNameGuard } from './profile/profile-persona-name.guard';
import { PlayerResolver } from './player.resolver';
import { ProfileIdUserGuard } from './profile/profile-id-user.guard';

const routes: Routes = [
  {
    path: `:${RouteParamEnum.idPlayer}`,
    component: ProfileComponent,
    resolve: [PlayerResolver],
  },
  {
    path: `p/:${RouteParamEnum.personaName}`,
    canActivate: [ProfilePersonaNameGuard],
  },
  {
    path: `u/:${RouteParamEnum.idUser}`,
    canActivate: [ProfileIdUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}

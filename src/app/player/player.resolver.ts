import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Player } from '../model/player';
import { PlayerService } from './player.service';
import { RouteParamEnum } from '../model/route-param.enum';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerResolver implements Resolve<Player> {
  constructor(private playerService: PlayerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
    const idPlayer = +route.paramMap.get(RouteParamEnum.idPlayer)!;
    return this.playerService.getById(idPlayer);
  }
}

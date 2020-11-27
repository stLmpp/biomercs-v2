import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { RouteParamEnum } from '../../model/route-param.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SteamRegisterGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const urlTree = this.router.createUrlTree(['/']);
    const steamid = route.paramMap.get(RouteParamEnum.steamid);
    if (!steamid) {
      return urlTree;
    }
    const token = this.authService.getSteamToken(steamid);
    if (!token) {
      return urlTree;
    }
    return this.authService.validateTokenRegisterSteam(steamid, token).pipe(map(isValid => isValid || urlTree));
  }
}

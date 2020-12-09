import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerQuery } from '../player.query';
import { RouterQuery } from '@stlmpp/router';
import { RouteParamEnum } from '../../model/route-param.enum';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Player, PlayerUpdateDto } from '../../model/player';
import { isObjectEmpty } from '@stlmpp/utils';
import { PlayerService } from '../player.service';
import { StateComponent } from '../../shared/components/common/state-component';
import { Animations } from '../../shared/animations/animations';
import { AuthQuery } from '../../auth/auth.query';
import { RegionService } from '../../region/region.service';

@Component({
  selector: 'bio-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.collapse.collapse()],
})
export class ProfileComponent extends StateComponent<{ editMode: boolean }> implements OnInit {
  constructor(
    private playerQuery: PlayerQuery,
    private routerQuery: RouterQuery,
    private playerService: PlayerService,
    private authQuery: AuthQuery,
    private regionService: RegionService
  ) {
    super({ editMode: false });
  }

  private _update$ = new BehaviorSubject<PlayerUpdateDto>({});
  private _idPlayer$ = this.routerQuery.selectParams(RouteParamEnum.idPlayer).pipe(
    filter(idPlayer => !!idPlayer),
    map(Number)
  );

  editMode$ = this.selectState('editMode');
  player$ = this._idPlayer$.pipe(switchMap(idPlayer => this.playerQuery.selectEntity(idPlayer)));
  isSameAsLogged$ = this._idPlayer$.pipe(switchMap(idPlayer => this.authQuery.selectIsSameAsLogged(idPlayer)));

  get idPlayer(): number {
    // idPlayer is required to access this component
    return +this.routerQuery.getParams(RouteParamEnum.idPlayer)!;
  }

  get player(): Player {
    return this.playerQuery.getEntity(this.idPlayer)!;
  }

  private _update(dto: PlayerUpdateDto): void {
    this.playerService.update(this.idPlayer, dto).subscribe();
  }

  toggleEditMode(): void {
    this.updateState('editMode', !this.getState('editMode'));
  }

  update<K extends keyof PlayerUpdateDto>(key: K, value: PlayerUpdateDto[K]): void {
    this._update$.next({ ...this._update$.value, [key]: value });
  }

  openModalSelectRegion(): void {
    const idRegionPlayer = this.player.region?.id ?? -1;
    this.regionService.showSelectModal(idRegionPlayer, idRegion =>
      this.playerService.update(this.idPlayer, { idRegion })
    );
  }

  ngOnInit(): void {
    this._update$
      .pipe(
        filter(update => !isObjectEmpty(update)),
        debounceTime(500)
      )
      .subscribe(update => {
        this._update(update);
        this._update$.next({});
      });
  }
}
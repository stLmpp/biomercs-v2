import { Injectable } from '@angular/core';
import { EntityState, EntityStore } from '@stlmpp/store';
import { Region } from '../model/region';
import { environment } from '../../environments/environment';

export type RegionState = EntityState<Region>;

@Injectable({ providedIn: 'root' })
export class RegionStore extends EntityStore<RegionState> {
  constructor() {
    super({ name: 'region', cache: environment.cacheTimeout });
  }
}

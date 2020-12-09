import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../model/region';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { RegionStore } from './region.store';
import { useCache } from '@stlmpp/store';
import { AbstractRegionService } from './region-service.token';
import { ModalRef } from '../shared/components/modal/modal-ref';
import { RegionSelectComponent, RegionSelectData } from './region-select/region-select.component';
import { ModalService } from '../shared/components/modal/modal.service';

@Injectable({ providedIn: 'root' })
export class RegionService extends AbstractRegionService {
  constructor(private http: HttpClient, private regionStore: RegionStore, private modalService: ModalService) {
    super();
  }

  endPoint = 'region';

  get(): Observable<Region[]> {
    return this.http.get<Region[]>(this.endPoint).pipe(
      useCache(this.regionStore),
      tap(regions => {
        this.regionStore.setEntities(regions);
      })
    );
  }

  showSelectModal(
    idRegion: number,
    onSelect: (idRegion: number) => Observable<any>
  ): ModalRef<RegionSelectComponent, RegionSelectData> {
    return this.modalService.open<RegionSelectComponent, RegionSelectData>(RegionSelectComponent, {
      data: { idRegion, onSelect },
      minWidth: 500,
    });
  }
}
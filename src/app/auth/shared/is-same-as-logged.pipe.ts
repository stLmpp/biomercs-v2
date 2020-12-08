import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../model/player';
import { AuthQuery } from '../auth.query';
import { isNumber } from '@stlmpp/utils';

@Pipe({ name: 'isSameAsLogged' })
export class IsSameAsLoggedPipe implements PipeTransform {
  constructor(private authQuery: AuthQuery) {}

  transform(value: number | Player): boolean {
    const idPlayer = isNumber(value) ? value : value.id;
    return idPlayer === this.authQuery.getUser()?.player?.id;
  }
}

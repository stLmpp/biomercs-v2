import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerQuery } from '../player.query';
import { RouterQuery } from '@stlmpp/router';

@Component({
  selector: 'bio-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  constructor(private playerQuery: PlayerQuery, private routerQuery: RouterQuery) {}
}

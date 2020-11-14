import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthQuery } from '../auth/auth.query';

@Component({
  selector: 'bio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private authQuery: AuthQuery) {}

  user$ = this.authQuery.user$;

  ngOnInit(): void {}
}

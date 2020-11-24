import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthQuery } from '../auth/auth.query';
import { AuthService } from '../auth/auth.service';
import { SnackBarService } from '../shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'bio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  user$ = this.authQuery.user$;
  isLogged$ = this.authQuery.isLogged$;

  logout(): void {
    this.authService.logout();
    this.snackBarService.open('Logout successful!');
  }
}

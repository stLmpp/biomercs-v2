import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteParamEnum } from '../../model/route-param.enum';
import { RouterQuery } from '@stlmpp/router';
import { ControlBuilder, Validators } from '@stlmpp/control';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthRegisterResponse } from '../../model/auth';
import { User } from '../../model/user';

interface SteamRegisterForm {
  code: number;
  email: string;
}

@Component({
  selector: 'bio-steam-register',
  templateUrl: './steam-register.component.html',
  styleUrls: ['./steam-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SteamRegisterComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private routerQuery: RouterQuery,
    private controlBuilder: ControlBuilder,
    private router: Router
  ) {}

  get steamid(): string {
    // This component is only accessible when there's a steamid in the route
    return this.activatedRoute.snapshot.paramMap.get(RouteParamEnum.steamid)!;
  }

  get token(): string {
    // This component has a guard for this token
    return this.authService.getSteamToken(this.steamid)!;
  }

  steamid$ = this.routerQuery.selectParams(RouteParamEnum.steamid);

  form = this.controlBuilder.group<SteamRegisterForm>({
    code: [],
    email: ['', [Validators.required, Validators.email]],
  });

  emailSent$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);

  idUser = 0;

  submit(): void {
    this.loading$.next(true);
    this.form.disable();
    let request$: Observable<User | AuthRegisterResponse>;
    if (this.emailSent$.value) {
      const { code } = this.form.value;
      request$ = this.authService.confirmCode(this.idUser, code).pipe(
        tap(() => {
          this.router.navigate(['/']).then();
        })
      );
    } else {
      const { email } = this.form.value;
      request$ = this.authService.registerSteam(this.steamid, email, this.token).pipe(
        tap(({ idUser }) => {
          this.emailSent$.next(true);
          this.form.get('code').setValidator(Validators.required);
          this.idUser = idUser;
        })
      );
    }
    request$
      .pipe(
        finalize(() => {
          this.form.enable();
          this.loading$.next(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    const steamid = this.steamid;
    if (steamid) {
      this.authService.removeSteamToken(steamid);
    }
  }
}

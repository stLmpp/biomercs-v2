import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteDataEnum, RouteParamEnum } from '../../model/route-param.enum';
import { RouterQuery } from '@stlmpp/router';
import { ControlBuilder, Validators } from '@stlmpp/control';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthRegisterResponse } from '../../model/auth';
import { User } from '../../model/user';
import { catchAndThrow } from '../../util/operators/catchError';

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
export class SteamRegisterComponent implements OnDestroy, OnInit {
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

  get token(): [string, number?] {
    // This component has a guard for this token
    return this.authService.getSteamToken(this.steamid)!;
  }

  steamid$ = this.routerQuery.selectParams(RouteParamEnum.steamid);

  form = this.controlBuilder.group<SteamRegisterForm>({
    code: [],
    email: ['', [Validators.required, Validators.email]],
  });

  emailSent$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  confirmCodeError$ = new BehaviorSubject<string | null>(null);

  idUser = 0;

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading$.next(true);
    this.form.disable();
    let request$: Observable<User | AuthRegisterResponse>;
    if (this.emailSent$.value) {
      this.confirmCodeError$.next(null);
      const { code } = this.form.value;
      request$ = this.authService.confirmCode(this.idUser, code).pipe(
        tap(() => {
          this.router.navigate(['/']).then();
        }),
        catchAndThrow(err => {
          this.confirmCodeError$.next(err.message);
        })
      );
    } else {
      const { email } = this.form.value;
      const [token] = this.token;
      request$ = this.authService.registerSteam(this.steamid, email, token).pipe(
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

  ngOnInit(): void {
    if (this.activatedRoute.getData<boolean>(RouteDataEnum.confirm)) {
      this.emailSent$.next(true);
      this.form.get('code').setValidator(Validators.required);
      const emailControl = this.form.get('email');
      emailControl.removeValidators(emailControl.validators);
      const [, idUser] = this.token;
      this.idUser = idUser!;
    }
    if (this.activatedRoute.snapshot.queryParamMap.has(RouteParamEnum.email)) {
      this.form.get('email').setValue(this.activatedRoute.snapshot.queryParamMap.get(RouteParamEnum.email));
    }
  }

  ngOnDestroy(): void {
    const steamid = this.steamid;
    if (steamid) {
      this.authService.removeSteamToken(steamid);
    }
  }
}

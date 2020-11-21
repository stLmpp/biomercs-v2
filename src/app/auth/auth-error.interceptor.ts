import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchAndThrow } from '../util/operators/catchError';
import { DialogService } from '../shared/components/modal/dialog/dialog.service';

@Injectable({ providedIn: 'root' })
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dialogService: DialogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchAndThrow(err => {
        switch (err.status) {
          case 403:
            this.dialogService.confirm({
              btnNo: null,
              btnYes: null,
              content: `<img src="/assets/illegal.jpg" alt="illegal">`,
            });
            break;
          case 401:
            this.dialogService
              .confirm({
                content: `It seems you're not logged...`,
                title: 'Sorry',
                btnNo: null,
                btnYes: 'Ok',
              })
              .subscribe(async () => {
                await this.router.navigate(['/auth', 'login']);
              });
            break;
        }
      })
    );
  }
}

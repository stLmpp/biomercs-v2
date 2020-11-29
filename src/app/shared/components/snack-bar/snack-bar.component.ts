import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { SnackBarConfig } from './snack-bar.config';
import { BehaviorSubject, isObservable, Observable, Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { Animations } from '../../animations/animations';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'snack-bar', '[@fadeInOut]': '' },
  animations: [Animations.fade.inOut()],
})
export class SnackBarComponent implements OnInit, OnDestroy {
  constructor(private overlayRef: OverlayRef, private snackBarConfig: SnackBarConfig) {}

  private _cancelTimeout$ = new Subject();

  @Input() message?: string;
  @Input() action?: string | null;
  @Input() actionObservable?: Observable<any>;
  @Input() showAction = true;

  @HostBinding('class.no-action')
  get noActionClass(): boolean {
    return !this.action;
  }

  onClose$ = new Subject<void>();
  onAction$ = new Subject<void>();

  loading$ = new BehaviorSubject<boolean>(false);

  private _startTimeout(): void {
    if (this.snackBarConfig.timeout) {
      timer(this.snackBarConfig.timeout)
        .pipe(takeUntil(this._cancelTimeout$))
        .subscribe(() => {
          if (this.snackBarConfig.timeoutCloseWithObservable) {
            this.closeWithObservable();
          } else {
            this.close();
          }
        });
    }
  }

  @HostListener('@fadeInOut.done', ['$event'])
  onFadeInOutDone($event: AnimationEvent): void {
    if ($event.toState === 'void') {
      this.overlayRef?.dispose();
    }
  }

  @HostListener('mouseenter')
  onMouseenter(): void {
    this._cancelTimeout$.next();
  }

  @HostListener('mouseleave')
  onMouseleave(): void {
    this._startTimeout();
  }

  onAction(): void {
    this.onAction$.next();
    this.onAction$.complete();
    this.closeWithObservable();
  }

  closeWithObservable(): void {
    if (this.actionObservable && isObservable(this.actionObservable)) {
      this.loading$.next(true);
      this.actionObservable.pipe(take(1)).subscribe(() => {
        this.loading$.next(false);
        this.close();
      });
    } else {
      this.close();
    }
  }

  close(): void {
    this.overlayRef.detach();
    this.onClose$.next();
    this.onClose$.complete();
  }

  ngOnInit(): void {
    this._startTimeout();
  }

  ngOnDestroy(): void {
    this._cancelTimeout$.next();
    this._cancelTimeout$.complete();
  }
}

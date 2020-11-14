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
import { fadeInOutAnimation } from '../../shared/animations/fade';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'snack-bar', '[@fadeInOut]': '' },
  animations: [fadeInOutAnimation()],
})
export class SnackBarComponent implements OnInit, OnDestroy {
  constructor(private overlayRef: OverlayRef, private snackBarConfig: SnackBarConfig) {}

  private _destroy$ = new Subject();

  @Input() message?: string;
  @Input() action?: string | null;
  @Input() actionObservable?: Observable<any>;
  @Input() showAction = true;

  @HostBinding('class.no-action')
  get noActionClass(): boolean {
    return !this.action;
  }

  onClose$ = new Subject<void>();

  loading$ = new BehaviorSubject<boolean>(false);

  @HostListener('@fadeInOut.done', ['$event'])
  onFadeInOutDone($event: AnimationEvent): void {
    if ($event.toState === 'void') {
      this.overlayRef?.dispose();
    }
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
    if (this.snackBarConfig.timeout) {
      timer(this.snackBarConfig.timeout)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          if (this.snackBarConfig.timeoutCloseWithObservable) {
            this.closeWithObservable();
          } else {
            this.close();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

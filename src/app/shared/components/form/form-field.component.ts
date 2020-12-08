import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { LabelDirective } from './label.directive';
import { InputDirective } from './input.directive';
import { SimpleChangesCustom } from '../../../util/util';
import { isNil } from '@stlmpp/utils';
import { Animations } from '../../animations/animations';
import { Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { FormFieldErrorComponent } from './error.component';
import { PrefixDirective } from '../common/prefix.directive';
import { SuffixDirective } from '../common/suffix.directive';

let uniqueId = 0;

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'form-field' },
  animations: [Animations.slide.in(), Animations.fade.in()],
})
export class FormFieldComponent implements AfterContentInit, OnChanges, OnDestroy {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  private _destroy$ = new Subject();

  @ContentChild(LabelDirective) labelDirective?: LabelDirective;
  @ContentChild(InputDirective) inputDirective?: InputDirective;
  @ContentChildren(FormFieldErrorComponent, { descendants: true }) errorComponents!: QueryList<FormFieldErrorComponent>;
  @ContentChild(PrefixDirective) prefixDirective?: PrefixDirective;
  @ContentChild(SuffixDirective) sufixDirective?: SuffixDirective;

  @Input() label?: string;
  @Input() id: string | number = uniqueId++;

  @Input() loading?: boolean;
  @Input() disabled?: boolean;

  ngAfterContentInit(): void {
    if (this.labelDirective) {
      this.labelDirective.for = this.id;
    }
    if (this.inputDirective) {
      this.inputDirective.id = this.id;
      if (this.inputDirective.controlDirective) {
        this.inputDirective.controlDirective.control.stateChanged$
          .pipe(takeUntil(this._destroy$), auditTime(50))
          .subscribe(() => {
            if (this.labelDirective) {
              this.labelDirective.danger = !!this.inputDirective?.dangerClass;
            }
            this.changeDetectorRef.markForCheck();
          });
        if (!isNil(this.loading) || !isNil(this.disabled)) {
          this.inputDirective.controlDirective.disabled = !!this.loading || !!this.disabled;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChangesCustom<FormFieldComponent>): void {
    if (changes.disabled && this.inputDirective?.controlDirective) {
      this.inputDirective.controlDirective.disabled = !!changes.disabled.currentValue;
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

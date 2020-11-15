import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from './input.directive';
import { LabelDirective } from './label.directive';
import { SpinnerModule } from '../spinner/spinner.module';
import { FormFieldErrorsDirective } from './errors.directive';
import { FormFieldComponent } from './form-field.component';
import { FormFieldErrorComponent } from './error.component';
import { FormFieldHintDirective } from './hint.directive';
import { NgLetModule } from '../../let/ng-let.module';
import { FormFieldPrefixDirective } from './prefix.directive';
import { FormFieldSuffixDirective } from './suffix.directive';

@NgModule({
  declarations: [
    InputDirective,
    FormFieldComponent,
    LabelDirective,
    FormFieldErrorsDirective,
    FormFieldErrorComponent,
    FormFieldHintDirective,
    FormFieldPrefixDirective,
    FormFieldSuffixDirective,
  ],
  exports: [
    InputDirective,
    FormFieldComponent,
    LabelDirective,
    FormFieldErrorsDirective,
    FormFieldErrorComponent,
    FormFieldHintDirective,
    FormFieldPrefixDirective,
    FormFieldSuffixDirective,
  ],
  imports: [CommonModule, SpinnerModule, NgLetModule],
})
export class FormModule {}

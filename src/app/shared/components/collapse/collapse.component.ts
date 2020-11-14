import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { collapseAnimation, collapseIconAnimation } from '../../animations/collapse';
import { CollapseTitleDirective } from './collapse-title.directive';

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapseAnimation(), collapseIconAnimation()],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'collapse' },
})
export class CollapseComponent extends CdkAccordionItem implements OnInit {
  @Input() collapseTitle?: string;

  @ContentChildren(CollapseTitleDirective) collapseTitleDirectives!: QueryList<CollapseTitleDirective>;

  @HostBinding('class.expanded') get expandedClass(): boolean {
    return this.expanded;
  }
  @HostBinding('class.disabled') get disabledClass(): boolean {
    return this.disabled;
  }

  ngOnInit(): void {}
}

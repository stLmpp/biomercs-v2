import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractComponent } from '../core/abstract-component';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'material-icons' },
})
export class IconComponent extends AbstractComponent {}

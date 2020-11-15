import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Control, Validators } from '@stlmpp/control';

@Component({
  selector: 'bio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  control = new Control('', { validators: [Validators.required, Validators.email, Validators.minLength(3)] });
}

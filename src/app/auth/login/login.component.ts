import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Control, Validators } from '@stlmpp/control';
import { AuthService } from '../auth.service';
import { SocketIOService } from '../../shared/socket-io/socket-io.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private socketIOService: SocketIOService) {}

  control = new Control('', { validators: [Validators.required, Validators.email, Validators.minLength(3)] });

  ngOnInit(): void {}
}

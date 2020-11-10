import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private overlay: Overlay) {}
}

import { ConnectedPosition } from '@angular/cdk/overlay';

export interface OverlayPositions {
  top: ConnectedPosition;
  right: ConnectedPosition;
  bottom: ConnectedPosition;
  left: ConnectedPosition;
}

export const overlayPositions: OverlayPositions = {
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
};

export const cdkOverlayTransparentBackdrop = 'cdk-overlay-transparent-backdrop';

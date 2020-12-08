import { BaseModel } from './base-model';
import { trackByFactory } from '@stlmpp/utils';

export interface Region extends BaseModel {
  name: string;
  shortName: string;
}

export const trackByRegion = trackByFactory<Region>('id');

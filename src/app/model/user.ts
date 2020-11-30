import { BaseModel } from './base-model';
import { Player } from './player';

export interface User extends BaseModel {
  username: string;
  displayName: string;
  email: string;
  lastOnline: Date;
  rememberMe: boolean;
  token: string;
  admin: boolean;
  player?: Player;
}

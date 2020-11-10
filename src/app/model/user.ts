import { BaseModel } from './base-model';

export interface User extends BaseModel {
  username: string;
  displayName: string;
  email: string;
  lastOnline: Date;
  rememberMe: boolean;
  token: string;
}

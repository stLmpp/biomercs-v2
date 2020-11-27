import { User } from './user';

export interface Auth {
  user: User | null;
}

export interface AuthRegisterResponse {
  email: string;
  message: string;
  idUser: number;
}

export interface AuthRegisterDto {
  username: string;
  password: string;
  email: string;
}

export interface AuthCredentialsDto {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export class SteamLoggedEvent {
  uuid!: string;
  token!: string;
  error: string | null | undefined;
  steamid: string | null | undefined;

  static eventName = 'logged-steam';
  static namespace = 'auth';
}

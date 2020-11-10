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

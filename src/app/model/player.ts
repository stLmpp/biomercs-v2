import { BaseModel } from './base-model';
import { User } from './user';
import { SteamProfile } from './steam-profile';
import { Region } from './region';

export interface Player extends BaseModel {
  personaName: string;
  title?: string;
  aboutMe?: string;
  idUser?: number;
  user?: User;
  idSteamProfile?: number;
  steamProfile?: SteamProfile;
  noUser: boolean;
  idRegion: number;
  region?: Region;
}

export interface PlayerUpdateDto {
  personaName?: string;
  title?: string;
  aboutMe?: string;
  idRegion?: number;
}

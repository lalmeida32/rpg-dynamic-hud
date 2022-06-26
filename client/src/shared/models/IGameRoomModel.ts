import { TStatBarColor } from 'shared/types/TStatBarColor';

export interface IGameRoomModel {
  uniqueCode: string;
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

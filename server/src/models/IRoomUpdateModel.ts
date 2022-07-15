import { TStatBarColor } from 'types/TStatBarColor';

export interface IRoomUpdateModel {
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

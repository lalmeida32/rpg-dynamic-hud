import { TStatBarColor } from 'types/TStatBarColor';

export interface IRoomCreateModel {
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

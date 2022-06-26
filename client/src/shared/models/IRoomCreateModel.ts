import { TStatBarColor } from 'shared/types/TStatBarColor';

export interface IRoomCreateModel {
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

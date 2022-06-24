import { TStatBarColor } from 'shared/types/TStatBarColor';

export interface IRoomCreateModel {
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

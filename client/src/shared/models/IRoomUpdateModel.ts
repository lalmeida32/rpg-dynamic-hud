import { TStatBarColor } from 'shared/types/TStatBarColor';

export interface IRoomUpdateModel {
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

import { TStatBarColor } from 'types/TStatBarColor';

export interface IRoomGetModel {
  uniqueCode: string;
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

import { TStatBarColor } from 'shared/types/TStatBarColor';

export interface IRoomGetModel {
  uniqueCode: string;
  owner: string;
  name: string;
  statBars: [string, TStatBarColor][];
  attributes: string[];
  dices: number[];
}

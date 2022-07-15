import { randomInteger } from 'util/random';

export class GameSocketService {
  private static instance: GameSocketService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GameSocketService {
    if (GameSocketService.instance === null)
      GameSocketService.instance = new GameSocketService();

    return GameSocketService.instance;
  }

  rollDice(diceCap: number): number {
    return randomInteger(1, diceCap);
  }
}

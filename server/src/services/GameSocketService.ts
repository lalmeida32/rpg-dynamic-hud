export class GameSocketService {
  private static instance: GameSocketService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GameSocketService {
    if (GameSocketService.instance === null)
      GameSocketService.instance = new GameSocketService();

    return GameSocketService.instance;
  }

  async rollDice(value: number): Promise<number> {
    return value;
  }
}

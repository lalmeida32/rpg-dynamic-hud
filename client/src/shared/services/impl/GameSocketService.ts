import { io, Socket } from 'socket.io-client';
import { IGameSocketService } from '../IGameSocketService';

export class GameSocketService implements IGameSocketService {
  private static instance: GameSocketService | null = null;
  private static socket: Socket | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GameSocketService {
    if (GameSocketService.instance === null)
      GameSocketService.instance = new GameSocketService();

    return GameSocketService.instance;
  }

  connect(): Socket {
    if (GameSocketService.socket !== null) return GameSocketService.socket;
    GameSocketService.socket = io('ws://localhost:4000/');

    return GameSocketService.socket;
  }

  disconnect(): void {
    if (GameSocketService.socket === null) return;
    GameSocketService.socket?.disconnect();
    GameSocketService.socket = null;
  }
}

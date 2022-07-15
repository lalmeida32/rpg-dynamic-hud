import { io, Socket } from 'socket.io-client';
import { IGameSocketService } from '../IGameSocketService';

export class GameSocketService implements IGameSocketService {
  private static instance: GameSocketService | null = null;
  private socket: Socket | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GameSocketService {
    if (GameSocketService.instance === null)
      GameSocketService.instance = new GameSocketService();

    return GameSocketService.instance;
  }

  connect(): Socket {
    if (this.socket !== null) return this.socket;
    this.socket = io('ws://localhost:4000/');

    return this.socket;
  }

  disconnect(): void {
    if (this.socket === null) return;
    this.socket?.disconnect();
    this.socket = null;
  }
}

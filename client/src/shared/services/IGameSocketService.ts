import { Socket } from 'socket.io-client';

export interface IGameSocketService {
  connect: () => Socket;
  disconnect: () => void;
}

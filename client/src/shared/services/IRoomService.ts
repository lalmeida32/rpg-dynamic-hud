import { IGameRoomModel } from 'shared/models/IGameRoomModel';
import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';

export interface IRoomService {
  createRoom: (
    token: string,
    username: string,
    room: IRoomCreateModel
  ) => Promise<void>;
  getRoom: (
    token: string,
    username: string,
    uniqueCode: string
  ) => Promise<IGameRoomModel>;
  closeRoom: (
    token: string,
    username: string,
    uniqueCode: string
  ) => Promise<void>;
  openRoom: (
    token: string,
    username: string,
    uniqueCode: string
  ) => Promise<void>;
}

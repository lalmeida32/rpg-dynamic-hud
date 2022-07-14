import { IRoomGetModel } from 'shared/models/IRoomGetModel';
import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';
import { IRoomUpdateModel } from 'shared/models/IRoomUpdateModel';

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
  ) => Promise<IRoomGetModel>;
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
  updateRoom: (
    token: string,
    username: string,
    uniqueCode: string,
    room: IRoomUpdateModel
  ) => Promise<void>;
}

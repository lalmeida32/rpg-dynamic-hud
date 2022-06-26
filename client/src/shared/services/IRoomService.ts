import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';

export interface IRoomService {
  createRoom: (
    token: string,
    username: string,
    room: IRoomCreateModel
  ) => Promise<void>;
}

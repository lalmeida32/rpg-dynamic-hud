import { IRoomCardModel } from 'shared/models/IRoomCardModel';

export interface IServerService {
  roomCardPagination: (
    username: string,
    page: number
  ) => Promise<IRoomCardModel[]>;
  logIn: (user: string, password: string) => Promise<string>;
}

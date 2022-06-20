import { IRoomCardModel } from 'shared/models/IRoomCardModel';

export interface IServerService {
  roomCardPagination: (username: string, page: number) => IRoomCardModel[];
  logIn: (user: string, password: string) => string;
}

import { IRoomCardModel } from 'shared/model/IRoomCardModel';

export interface IServerService {
  roomCardPagination: (username: string, page: number) => IRoomCardModel[];
  logIn: (username: string, password: string) => void;
}

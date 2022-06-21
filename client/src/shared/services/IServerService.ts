import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';

export interface IServerService {
  roomCardPagination: (
    username: string,
    page: number
  ) => Promise<IRoomCardModel[]>;
  logIn: (user: string, password: string) => Promise<string>;
  registerUser: (user: IUserRegisterModel) => Promise<void>;
}

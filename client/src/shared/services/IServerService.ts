import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';

export interface IServerService {
  roomCardPagination: (
    username: string,
    page: number
  ) => Promise<IRoomCardModel[]>;
  roomPageCount: (username: string) => Promise<number>;
  logIn: (user: string, password: string) => Promise<[string, string]>;
  registerUser: (user: IUserRegisterModel) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
}

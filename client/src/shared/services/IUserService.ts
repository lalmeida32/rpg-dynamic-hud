import { IUserGetModel } from 'shared/models/IUserGetModel';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';
import { IUserUpdateModel } from 'shared/models/IUserUpdateModel';

export interface IUserService {
  registerUser: (user: IUserRegisterModel) => Promise<void>;
  getUser: (token: string, username: string) => Promise<IUserGetModel>;
  updateUser: (
    token: string,
    username: string,
    user: IUserUpdateModel
  ) => Promise<void>;
  updatePassword: (
    token: string,
    username: string,
    newPassword: string
  ) => Promise<void>;
}

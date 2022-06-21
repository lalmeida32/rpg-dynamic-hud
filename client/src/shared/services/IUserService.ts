import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';

export interface IUserService {
  registerUser: (user: IUserRegisterModel) => Promise<void>;
}

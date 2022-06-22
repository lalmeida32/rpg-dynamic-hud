import { delay } from 'shared/lib/delay';
import { IUserGetModel } from 'shared/models/IUserGetModel';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';
import { IUserUpdateModel } from 'shared/models/IUserUpdateModel';
import { IUserService } from '../IUserService';
import { userRepositoryMock } from './userRepositoryMock';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from './validationMock';

export class UserServiceMock implements IUserService {
  private static instance: UserServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserServiceMock {
    if (UserServiceMock.instance === null)
      UserServiceMock.instance = new UserServiceMock();

    return UserServiceMock.instance;
  }

  async registerUser(user: IUserRegisterModel): Promise<void> {
    await delay();

    if (!validateEmail(user.email)) throw new Error('Invalid Email.');

    if (!validateUsername(user.username))
      throw new Error('Username must have at least 4 characters.');

    if (!validatePassword(user.password))
      throw new Error('Password must have at least 8 characters.');

    if (userRepositoryMock.checkIfExistsByUsername(user.username))
      throw new Error('Username already exists!');

    if (userRepositoryMock.findUsernameByEmail(user.email) !== null)
      throw new Error('Email already exists!');

    userRepositoryMock.addUser(user.username, {
      email: user.email,
      password: user.password,
    });
  }

  async getUser(token: string, username: string): Promise<IUserGetModel> {
    await delay();
    const user = userRepositoryMock.findByUsername(username);
    if (user === null)
      throw new Error('Username not found. Critical error occurred.');

    return {
      username: username,
      email: user.email,
    };
  }

  async updateUser(
    token: string,
    username: string,
    user: IUserUpdateModel
  ): Promise<void> {
    await delay();

    const userFound = userRepositoryMock.findByUsername(username);

    if (userFound === null)
      throw new Error('Username not found. Critical error occurred.');

    if (!validateEmail(user.email)) throw new Error('Invalid Email.');

    if (!validateUsername(user.username))
      throw new Error('Username must have at least 4 characters.');

    userRepositoryMock.changeUser(username, user.username, {
      email: user.email,
      password: userFound.password,
    });
  }
}

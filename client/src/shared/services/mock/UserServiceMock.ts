import { delay } from 'shared/lib/delay';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';
import { IUserService } from '../IUserService';
import { userRepositoryMock } from './userRepositoryMock';
import { validateEmail } from './validationMock';

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

    if (user.username.length < 4)
      throw new Error('Username must have at least 4 characters.');

    if (user.password.length < 8)
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
}

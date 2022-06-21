import { delay } from 'shared/lib/delay';
import { IAuthService } from '../IAuthService';
import { userRepositoryMock } from './userRepositoryMock';

export class AuthServiceMock implements IAuthService {
  private static instance: AuthServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): AuthServiceMock {
    if (AuthServiceMock.instance === null)
      AuthServiceMock.instance = new AuthServiceMock();

    return AuthServiceMock.instance;
  }

  async logIn(userId: string, password: string): Promise<[string, string]> {
    await delay();

    let username: string | null = userId;

    if (!userRepositoryMock.checkIfExistsByUsername(userId)) {
      username = null;
      username = userRepositoryMock.findUsernameByEmail(userId);
    }

    let user = null;
    if (username !== null) user = userRepositoryMock.findByUsername(username);
    if (username === null || user === null) throw new Error('Invalid user!');

    if (user.password !== password) throw new Error('Invalid password!');

    return [username, 'tokenstring'];
  }
}

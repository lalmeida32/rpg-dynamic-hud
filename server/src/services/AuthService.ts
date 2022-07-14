import { UserRepository } from 'repositories/UserRepository';

export class AuthService {
  private static instance: AuthService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): AuthService {
    if (AuthService.instance === null) AuthService.instance = new AuthService();

    return AuthService.instance;
  }

  async logIn(userId: string, password: string): Promise<[string, string]> {
    let username: string | null = userId;

    if (!(await UserRepository.checkIfExistsByUsername(userId))) {
      username = null;
      username = await UserRepository.findUsernameByEmail(userId);
    }

    let user = null;
    if (username !== null) user = await UserRepository.findByUsername(username);
    if (username === null || user === null) throw new Error('Invalid user!');

    if (user.password !== password) throw new Error('Invalid password!');

    return [username, 'tokenstring'];
  }
}

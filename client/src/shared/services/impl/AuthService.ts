import { IAuthService } from '../IAuthService';

export class AuthService implements IAuthService {
  private static instance: AuthService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): AuthService {
    if (AuthService.instance === null) AuthService.instance = new AuthService();

    return AuthService.instance;
  }

  async logIn(userId: string, password: string): Promise<[string, string]> {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.status !== 200) throw new Error(body.message);
      return body as [string, string];
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
    throw new Error('Fatal error.');
  }
}

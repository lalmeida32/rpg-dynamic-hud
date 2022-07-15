import { IUserGetModel } from 'shared/models/IUserGetModel';
import { IUserRegisterModel } from 'shared/models/IUserRegisterModel';
import { IUserUpdateModel } from 'shared/models/IUserUpdateModel';
import { IUserService } from '../IUserService';

export class UserService implements IUserService {
  private static instance: UserService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserService {
    if (UserService.instance === null) UserService.instance = new UserService();

    return UserService.instance;
  }

  async registerUser(user: IUserRegisterModel): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/users/', {
        method: 'POST',
        body: JSON.stringify({
          userInfo: user,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async getUser(token: string, username: string): Promise<IUserGetModel> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/users/${username}`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const body = await response.json();
      if (response.status !== 200) throw new Error(body.message);
      return body as IUserGetModel;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }

    throw new Error('Fatal error.');
  }

  async updateUser(
    token: string,
    username: string,
    user: IUserUpdateModel
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/users/${username}/info`,
        {
          method: 'PATCH',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInfo: user }),
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async updatePassword(
    token: string,
    username: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/users/${username}/password`,
        {
          method: 'PATCH',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async deleteAccount(
    token: string,
    username: string,
    password: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/users/${username}`,
        {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }
}

import { IUserGetModel } from 'models/IUserGetModel';
import { IUserRegisterModel } from 'models/IUserRegisterModel';
import { IUserUpdateModel } from 'models/IUserUpdateModel';
import { CharacterRepository } from 'repositories/CharacterRepository';
import { RoomRepository } from 'repositories/RoomRepository';
import { UserRepository } from 'repositories/UserRepository';
import { validateToken } from 'util/auth';
import { passwordEncryptor } from 'util/password_encryptor';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from 'util/validation';

export class UserService {
  private static instance: UserService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): UserService {
    if (UserService.instance === null) UserService.instance = new UserService();

    return UserService.instance;
  }

  async registerUser(user: IUserRegisterModel): Promise<void> {
    if (!validateEmail(user.email)) throw new Error('Invalid Email.');

    if (!validateUsername(user.username))
      throw new Error('Username must have at least 4 characters.');

    if (!validatePassword(user.password))
      throw new Error('Password must have at least 8 characters.');

    if (await UserRepository.checkIfExistsByUsername(user.username))
      throw new Error('Username already exists!');

    if ((await UserRepository.findUsernameByEmail(user.email)) !== null)
      throw new Error('Email already exists!');

    await UserRepository.addUser({
      username: user.username,
      email: user.email,
      password: passwordEncryptor(user.password),
    });
  }

  async getUser(token: string): Promise<IUserGetModel> {
    const username = validateToken(token);
    const user = await UserRepository.findByUsername(username);
    if (user === null)
      throw new Error('Username not found. Critical error occurred.');

    return {
      username: username,
      email: user.email,
    };
  }

  async updateUser(token: string, user: IUserUpdateModel): Promise<void> {
    const username = validateToken(token);
    const userFound = await UserRepository.findByUsername(username);

    if (userFound === null)
      throw new Error('Username not found. Critical error occurred.');

    if (!validateEmail(user.email)) throw new Error('Invalid Email.');

    if (!validateUsername(user.username))
      throw new Error('Username must have at least 4 characters.');

    await UserRepository.changeUser(username, {
      username: user.username,
      email: user.email,
      password: userFound.password,
    });

    await RoomRepository.ownerUsernameChanged(username, user.username);
    await CharacterRepository.usernameChanged(username, user.username);
  }

  async updatePassword(
    token: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const username = validateToken(token);
    const userFound = await UserRepository.findByUsername(username);

    if (userFound === null)
      throw new Error('Username not found. Critical error occurred.');

    if (userFound.password !== oldPassword)
      throw new Error('Invalid password!');

    if (!validatePassword(newPassword))
      throw new Error('Password must have at least 8 characters.');

    await UserRepository.changeUser(username, {
      username,
      email: userFound.email,
      password: newPassword,
    });
  }

  async deleteAccount(token: string, password: string): Promise<void> {
    const username = validateToken(token);
    const userFound = await UserRepository.findByUsername(username);

    if (userFound === null)
      throw new Error('Username not found. Critical error occurred.');

    if (userFound.password !== password) throw new Error('Invalid password!');

    await UserRepository.deleteUser(username);
    await RoomRepository.ownerUsernameDeleted(username);
    await CharacterRepository.usernameDeleted(username);
  }
}

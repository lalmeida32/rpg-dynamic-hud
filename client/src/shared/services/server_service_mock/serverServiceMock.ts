import { delay } from 'shared/lib/delay';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IServerService } from '../IServerService';
import { roomDb } from './roomDb';
import { getUsernameByEmail, userDb, validateEmail } from './userDb';

export const serverServiceMock: IServerService = {
  logIn: async (user, password) => {
    await delay();

    let username: string | null = user;

    if (!(username in userDb)) {
      username = getUsernameByEmail(user);
      if (username === null || !(username in userDb)) username = null;
    }

    if (username === null) throw new Error('Invalid user!');

    if (userDb[username].password !== password)
      throw new Error('Invalid password!');

    return [username, 'tokenstring'];
  },

  roomCardPagination: async (username, page) => {
    await delay();
    const roomCodes = Object.keys(roomDb).filter(
      v => roomDb[v].owner === username
    );

    const result: IRoomCardModel[] = roomCodes
      .map(v => ({
        name: roomDb[v].name,
        opened: roomDb[v].opened,
        owner: roomDb[v].owner,
        private: roomDb[v].private,
        uniqueCode: v,
      }))
      .slice((page - 1) * 6, page * 6);

    return result;
  },

  roomPageCount: async username => {
    await delay();
    const pageCount = Object.keys(roomDb).reduce<number>(
      (p, c) => (roomDb[c].owner === username ? p + 1 : p),
      0
    );
    return Math.floor(pageCount / 6) + 1;
  },

  registerUser: async user => {
    await delay();

    if (!validateEmail(user.email)) throw new Error('Invalid Email.');

    if (user.username.length < 4)
      throw new Error('Username must have at least 4 characters.');

    if (user.password.length < 8)
      throw new Error('Password must have at least 8 characters.');

    if (user.username in userDb) throw new Error('Username already exists!');
    if (getUsernameByEmail(user.email) !== null)
      throw new Error('Email already exists!');

    userDb[user.username] = {
      email: user.email,
      password: user.password,
    };
  },

  sendResetPasswordEmail: async email => {
    await delay();
    if (!validateEmail(email)) throw new Error('Invalid Email.');
  },
};

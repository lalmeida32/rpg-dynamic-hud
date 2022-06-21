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
    console.log(username, page);
    const result: IRoomCardModel[] = [];
    for (const uniqueCode in roomDb) {
      result.push({
        name: roomDb[uniqueCode].name,
        opened: roomDb[uniqueCode].opened,
        owner: roomDb[uniqueCode].owner,
        private: roomDb[uniqueCode].private,
        uniqueCode: uniqueCode,
      });
    }
    return result;
  },

  roomPageCount: async username => {
    await delay();
    console.log(username);
    return 10;
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

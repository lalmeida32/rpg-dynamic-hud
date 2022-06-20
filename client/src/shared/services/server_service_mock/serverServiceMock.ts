import { delay } from 'shared/lib/delay';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IServerService } from '../IServerService';
import { roomDb } from './roomDb';

export const serverServiceMock: IServerService = {
  logIn: async (user, password) => {
    console.log(user, password);
    return delay('tokenstring');
  },
  roomCardPagination: async (username, page) => {
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
    return delay(result);
  },
};

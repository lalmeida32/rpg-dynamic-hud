import { IRoomCardModel } from 'shared/model/IRoomCardModel';
import { IServerService } from '../IServerService';
import { roomDb } from './roomDb';

export const serverServiceMock: IServerService = {
  logIn: (username, password) => {
    console.log(username, password);
  },
  roomCardPagination: (username, page) => {
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
};

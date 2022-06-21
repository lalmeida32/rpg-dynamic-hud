import { IRoomCardModel } from 'shared/models/IRoomCardModel';

export interface IRoomPaginationService {
  roomCardPagination: (
    token: string,
    username: string,
    page: number
  ) => Promise<IRoomCardModel[]>;
  roomPageCount: (token: string, username: string) => Promise<number>;
}

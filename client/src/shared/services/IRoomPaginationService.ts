import { IRoomCardModel } from 'shared/models/IRoomCardModel';

export interface IRoomPaginationService {
  roomCardPagination: (
    token: string,
    username: string,
    page: number
  ) => Promise<[number, IRoomCardModel[]]>;
  roomCardPaginationWithSearch: (
    token: string,
    query: string,
    page: number
  ) => Promise<[number, IRoomCardModel[]]>;
}

import { delay } from 'shared/lib/delay';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IRoomPaginationService } from '../IRoomPaginationService';
import { IRoomMock, roomRepositoryMock } from './roomRepositoryMock';

export class RoomPaginationServiceMock implements IRoomPaginationService {
  private static instance: RoomPaginationServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): RoomPaginationServiceMock {
    if (RoomPaginationServiceMock.instance === null)
      RoomPaginationServiceMock.instance = new RoomPaginationServiceMock();

    return RoomPaginationServiceMock.instance;
  }

  async roomCardPagination(
    token: string,
    username: string,
    page: number
  ): Promise<IRoomCardModel[]> {
    await delay();

    const roomCodes = roomRepositoryMock
      .findAllUniqueCodes()
      .filter(v => roomRepositoryMock.findByUniqueCode(v)?.owner === username);

    const result: IRoomCardModel[] = roomCodes
      .slice((page - 1) * 6, page * 6)
      .map(
        id =>
          [id, roomRepositoryMock.findByUniqueCode(id)] as [
            string,
            IRoomMock | null
          ]
      )
      .filter(v => v[1] !== null)
      .map(v => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        name: v[1]!.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        opened: v[1]!.opened,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        owner: v[1]!.owner,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        private: v[1]!.private,
        uniqueCode: v[0],
      }));

    return result;
  }

  async roomPageCount(token: string, username: string): Promise<number> {
    await delay();
    const pageCount = roomRepositoryMock
      .findAllUniqueCodes()
      .reduce<number>(
        (p, c) =>
          roomRepositoryMock.findByUniqueCode(c)?.owner === username
            ? p + 1
            : p,
        0
      );
    return Math.floor(pageCount / 6) + 1;
  }
}

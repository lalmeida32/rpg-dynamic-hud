import { delay } from 'shared/lib/delay';
import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IRoomPaginationService } from '../IRoomPaginationService';
import { IRoomMock, roomRepositoryMock } from './roomRepositoryMock';

const generatePage = (roomCodes: string[], page: number): IRoomCardModel[] => {
  return roomCodes
    .slice((page - 1) * 6, page * 6)
    .map(
      id =>
        [id, roomRepositoryMock.findByUniqueCode(id)] as [
          string,
          IRoomMock | null
        ]
    )
    .filter(v => v[1] !== null)
    .map<IRoomCardModel>(v => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: v[1]!.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      opened: v[1]!.opened,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      owner: v[1]!.owner,
      uniqueCode: v[0],
    }));
};

const countRoomPages = (roomsCount: number): number =>
  roomsCount !== 0 ? Math.ceil(roomsCount / 6) : 1;

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
  ): Promise<[number, IRoomCardModel[]]> {
    await delay();

    if (isNaN(page) || !Number.isInteger(page) || page <= 0) page = 1;

    const roomCodes = roomRepositoryMock
      .findAllUniqueCodes()
      .filter(v => roomRepositoryMock.findByUniqueCode(v)?.owner === username);

    return [countRoomPages(roomCodes.length), generatePage(roomCodes, page)];
  }

  async roomCardPaginationWithSearch(
    token: string,
    query: string,
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    await delay();

    let roomCodes = [];
    query = query.trim().toLowerCase();

    // Find by unique code
    if (query.startsWith('#')) {
      const uniqueCode = query.slice(1);
      if (roomRepositoryMock.checkIfExistsByUniqueCode(uniqueCode))
        roomCodes.push(uniqueCode);
    }

    // Find by owner
    else if (query.startsWith('@')) {
      const owner = query.slice(1);
      roomCodes = roomRepositoryMock
        .findAllUniqueCodes()
        .filter(v => roomRepositoryMock.findByUniqueCode(v)?.owner === owner);
    }

    // Find by name
    else {
      roomCodes = roomRepositoryMock
        .findAllUniqueCodes()
        .filter(v =>
          roomRepositoryMock
            .findByUniqueCode(v)
            ?.name.toLowerCase()
            .includes(query)
        );
    }

    return [countRoomPages(roomCodes.length), generatePage(roomCodes, page)];
  }
}

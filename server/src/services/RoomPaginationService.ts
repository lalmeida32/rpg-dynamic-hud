import { IRoomCardModel } from 'models/IRoomCardModel';
import { IRoom, RoomRepository } from 'repositories/RoomRepository';

const generatePage = (roomCodes: string[], page: number): IRoomCardModel[] => {
  return roomCodes
    .slice((page - 1) * 6, page * 6)
    .map(
      id =>
        [id, await RoomRepository.findByUniqueCode(id)] as [
          string,
          IRoom | null
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

export class RoomPaginationService {
  private static instance: RoomPaginationService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): RoomPaginationService {
    if (RoomPaginationService.instance === null)
      RoomPaginationService.instance = new RoomPaginationService();

    return RoomPaginationService.instance;
  }

  async roomCardPagination(
    token: string,
    username: string,
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    if (isNaN(page) || !Number.isInteger(page) || page <= 0) page = 1;

    const roomCodes = RoomRepository.findAllUniqueCodes().filter(
      v => RoomRepository.findByUniqueCode(v)?.owner === username
    );

    return [countRoomPages(roomCodes.length), generatePage(roomCodes, page)];
  }

  async roomCardPaginationWithSearch(
    token: string,
    query: string,
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    let roomCodes = [];
    query = query.trim().toLowerCase();

    // Find by unique code
    if (query.startsWith('#')) {
      const uniqueCode = query.slice(1);
      if (await RoomRepository.checkIfExistsByUniqueCode(uniqueCode))
        roomCodes.push(uniqueCode);
    }

    // Find by owner
    else if (query.startsWith('@')) {
      const owner = query.slice(1);
      roomCodes = RoomRepository.findAllUniqueCodes().filter(
        v => RoomRepository.findByUniqueCode(v)?.owner === owner
      );
    }

    // Find by name
    else {
      roomCodes = RoomRepository.findAllUniqueCodes().filter(v =>
        RoomRepository.findByUniqueCode(v)?.name.toLowerCase().includes(query)
      );
    }

    return [countRoomPages(roomCodes.length), generatePage(roomCodes, page)];
  }
}

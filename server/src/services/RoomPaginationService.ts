import { IRoomCardModel } from 'models/IRoomCardModel';
import { IRoom, RoomRepository } from 'repositories/RoomRepository';
import { validateToken } from 'util/auth';

const generatePage = async (
  roomCodes: string[],
  page: number
): Promise<IRoomCardModel[]> => {
  const slicedCodes = roomCodes.slice((page - 1) * 6, page * 6);

  const rooms = [];
  for (const code of slicedCodes)
    rooms.push(await RoomRepository.findByUniqueCode(code));

  const mappedCodes = rooms.map(
    r => [r?.uniqueCode, r] as [string, IRoom | null]
  );

  return mappedCodes
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
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    const username = validateToken(token);
    if (isNaN(page) || !Number.isInteger(page) || page <= 0) page = 1;

    const roomCodes = (await RoomRepository.findAll())
      .filter(v => v.owner === username)
      .map(v => v.uniqueCode);

    return [
      countRoomPages(roomCodes.length),
      await generatePage(roomCodes, page),
    ];
  }

  async roomCardPaginationWithSearch(
    token: string,
    query: string,
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    validateToken(token);
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
      roomCodes = (await RoomRepository.findAll())
        .filter(v => v.owner === owner)
        .map(v => v.uniqueCode);
    }

    // Find by name
    else {
      roomCodes = (await RoomRepository.findAll())
        .filter(v => v.name.toLowerCase().includes(query))
        .map(v => v.uniqueCode);
    }

    return [
      countRoomPages(roomCodes.length),
      await generatePage(roomCodes, page),
    ];
  }
}

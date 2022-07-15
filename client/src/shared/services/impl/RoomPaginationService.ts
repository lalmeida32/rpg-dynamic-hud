import { IRoomCardModel } from 'shared/models/IRoomCardModel';
import { IRoomPaginationService } from '../IRoomPaginationService';

export class RoomPaginationService implements IRoomPaginationService {
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
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/roompages/${page}`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const body = await response.json();
      if (response.status !== 200) throw new Error(body.message);
      return body as [number, IRoomCardModel[]];
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }

    throw new Error('Fatal error.');
  }

  async roomCardPaginationWithSearch(
    token: string,
    query: string,
    page: number
  ): Promise<[number, IRoomCardModel[]]> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/roompages/${page}/filter`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'x-query': query,
          },
        }
      );
      const body = await response.json();
      if (response.status !== 200) throw new Error(body.message);
      return body as [number, IRoomCardModel[]];
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }

    throw new Error('Fatal error.');
  }
}

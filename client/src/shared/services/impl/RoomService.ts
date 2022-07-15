import { IRoomGetModel } from 'shared/models/IRoomGetModel';
import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';
import { IRoomUpdateModel } from 'shared/models/IRoomUpdateModel';
import { IRoomService } from '../IRoomService';

export class RoomService implements IRoomService {
  private static instance: RoomService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): RoomService {
    if (RoomService.instance === null) RoomService.instance = new RoomService();

    return RoomService.instance;
  }

  async createRoom(
    token: string,
    username: string,
    room: IRoomCreateModel
  ): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/rooms/', {
        method: 'POST',
        body: JSON.stringify({
          roomInfo: room,
        }),
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async getRoom(
    token: string,
    username: string,
    uniqueCode: string
  ): Promise<IRoomGetModel> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/rooms/${uniqueCode}`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const body = await response.json();
      if (response.status !== 200) throw new Error(body.message);
      return body as IRoomGetModel;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }

    throw new Error('Fatal error.');
  }

  async openRoom(
    token: string,
    username: string,
    uniqueCode: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/rooms/${uniqueCode}/open`,
        {
          method: 'PATCH',
          headers: {
            'x-auth-token': token,
          },
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async closeRoom(
    token: string,
    username: string,
    uniqueCode: string
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/rooms/${uniqueCode}/close`,
        {
          method: 'PATCH',
          headers: {
            'x-auth-token': token,
          },
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }

  async updateRoom(
    token: string,
    username: string,
    uniqueCode: string,
    room: IRoomUpdateModel
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/rooms/${uniqueCode}`,
        {
          method: 'PUT',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomInfo: room }),
        }
      );
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }
}

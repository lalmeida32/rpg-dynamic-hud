import { delay } from 'shared/lib/delay';
import { IGameRoomModel } from 'shared/models/IGameRoomModel';
import { IRoomCreateModel } from 'shared/models/IRoomCreateModel';
import { TStatBarColor } from 'shared/types/TStatBarColor';
import { IRoomService } from '../IRoomService';
import { roomRepositoryMock } from './roomRepositoryMock';
import { userRepositoryMock } from './userRepositoryMock';

export class RoomServiceMock implements IRoomService {
  private static instance: RoomServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): RoomServiceMock {
    if (RoomServiceMock.instance === null)
      RoomServiceMock.instance = new RoomServiceMock();

    return RoomServiceMock.instance;
  }

  async createRoom(
    token: string,
    username: string,
    room: IRoomCreateModel
  ): Promise<void> {
    await delay();

    if (!userRepositoryMock.checkIfExistsByUsername(username))
      throw new Error('Username sent does not exist!');

    if (room.statBars.some(v => v[0].trim() === ''))
      throw new Error('Stat bar names cannot be empty!');

    if (room.attributes.some(v => v.trim() === ''))
      throw new Error('Attribute names cannot be empty!');

    if (room.dices.some(v => isNaN(v) || !Number.isInteger(v) || v <= 0))
      throw new Error('Dice must be positive integers!');

    roomRepositoryMock.addRoom({
      name: room.name,
      owner: username,
      opened: false,
      statBars: room.statBars.map(v => ({ name: v[0], color: v[1] })),
      attributes: room.attributes,
      dice: room.dices,
    });
  }
  async getRoom(
    token: string,
    username: string,
    uniqueCode: string
  ): Promise<IGameRoomModel> {
    await delay();
    const room = roomRepositoryMock.findByUniqueCode(uniqueCode);
    if (room === null) throw new Error('Room not found. May be deleted.');

    return {
      uniqueCode: uniqueCode,
      name: room.name,
      statBars: room.statBars.map(v => [v.name, v.color as TStatBarColor]),
      attributes: room.attributes,
      dices: room.dice,
    };
  }
}

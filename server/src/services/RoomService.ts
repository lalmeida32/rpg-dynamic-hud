import { IRoomCreateModel } from 'models/IRoomCreateModel';
import { IRoomGetModel } from 'models/IRoomGetModel';
import { IRoomUpdateModel } from 'models/IRoomUpdateModel';
import { RoomRepository } from 'repositories/RoomRepository';
import { UserRepository } from 'repositories/UserRepository';
import { TStatBarColor } from 'types/TStatBarColor';
import { validateToken } from 'util/auth';

const changeRoomHandled = async (
  username: string,
  uniqueCode: string,
  data: {
    attributes?: string[];
    statBars?: { name: string; color: string }[];
    dice?: number[];
    name?: string;
    opened?: boolean;
    owner?: string;
  }
) => {
  const room = await RoomRepository.findByUniqueCode(uniqueCode);
  if (room === null) throw new Error('Room not found. May be deleted.');

  if (room.owner !== username)
    throw new Error(
      "The user cannot perform this operation. The room's owner is another one."
    );

  await RoomRepository.changeRoom({
    uniqueCode,
    attributes:
      data.attributes === undefined ? room.attributes : data.attributes,
    dice: data.dice === undefined ? room.dice : data.dice,
    name: data.name === undefined ? room.name : data.name,
    opened: data.opened === undefined ? room.opened : data.opened,
    owner: data.owner === undefined ? room.owner : data.owner,
    statBars: data.statBars === undefined ? room.statBars : data.statBars,
  });
};

export class RoomService {
  private static instance: RoomService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): RoomService {
    if (RoomService.instance === null) RoomService.instance = new RoomService();

    return RoomService.instance;
  }

  async createRoom(token: string, room: IRoomCreateModel): Promise<void> {
    const username = validateToken(token);

    if (!(await UserRepository.checkIfExistsByUsername(username)))
      throw new Error('Username sent does not exist!');

    if (room.statBars.some(v => v[0].trim() === ''))
      throw new Error('Stat bar names cannot be empty!');

    if (room.attributes.some(v => v.trim() === ''))
      throw new Error('Attribute names cannot be empty!');

    if (room.dices.some(v => isNaN(v) || !Number.isInteger(v) || v <= 0))
      throw new Error('Dice must be positive integers!');

    await RoomRepository.addRoom({
      uniqueCode: '',
      name: room.name,
      owner: username,
      opened: false,
      statBars: room.statBars.map(v => ({ name: v[0], color: v[1] })),
      attributes: room.attributes,
      dice: room.dices,
    });
  }
  async getRoom(token: string, uniqueCode: string): Promise<IRoomGetModel> {
    validateToken(token);
    const room = await RoomRepository.findByUniqueCode(uniqueCode);
    if (room === null) throw new Error('Room not found. May be deleted.');

    return {
      uniqueCode: uniqueCode,
      name: room.name,
      statBars: room.statBars.map(v => [v.name, v.color as TStatBarColor]),
      attributes: room.attributes,
      dices: room.dice,
    };
  }

  async openRoom(token: string, uniqueCode: string): Promise<void> {
    const username = validateToken(token);
    await changeRoomHandled(username, uniqueCode, { opened: true });
  }

  async closeRoom(token: string, uniqueCode: string): Promise<void> {
    const username = validateToken(token);
    await changeRoomHandled(username, uniqueCode, { opened: false });
  }

  async updateRoom(
    token: string,
    uniqueCode: string,
    room: IRoomUpdateModel
  ): Promise<void> {
    const username = validateToken(token);
    await changeRoomHandled(username, uniqueCode, {
      attributes: room.attributes,
      dice: room.dices,
      name: room.name,
      statBars: room.statBars.map(statBar => ({
        name: statBar[0],
        color: statBar[1],
      })),
    });
  }
}

import { CharacterRepository, ICharacter } from 'repositories/CharacterRepository';
import { RoomRepository } from 'repositories/RoomRepository';
import { validateToken } from 'util/auth';
import { randomInteger } from 'util/random';

interface IGameSocketState {
  [key: string]: {
    socketId: string;
    name?: string;
    deadImage?: Uint8Array;
    lowImage?: Uint8Array;
    mediumImage?: Uint8Array;
    highImage?: Uint8Array;
    statusBars: { min: number; max: number }[];
    attributes: number[];
  };
}

interface IGameSocketStates {
  [key: string]: IGameSocketState;
}

export class GameSocketService {
  private static instance: GameSocketService | null = null;
  private states: IGameSocketStates = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GameSocketService {
    if (GameSocketService.instance === null)
      GameSocketService.instance = new GameSocketService();

    return GameSocketService.instance;
  }

  rollDice(token: string, roomCode: string, diceCap: number): [string, string] {
    const username = validateToken(token);
    return [`${username} rolled a d${diceCap} and got ${randomInteger(1, diceCap)}`, roomCode];
  }

  async joinRoom(
    token: string,
    roomCode: string,
    socketId: string
  ): Promise<IGameSocketState> {
    const username = validateToken(token);
    const room = await RoomRepository.findByUniqueCode(roomCode);

    if (room === null) throw new Error('The room does not exist.');
    if (room.opened === false) throw new Error('The room is not opened.');

    if (!(roomCode in this.states)) this.states[roomCode] = {};

    if (room.owner === username) return this.states[roomCode];

    const character = await CharacterRepository.findByCompositeKey(
      roomCode,
      username
    );
    if (character !== null)
      this.states[roomCode][username] = {
        socketId,
        name: character.name,
        deadImage: character.deadImage,
        lowImage: character.lowImage,
        mediumImage: character.mediumImage,
        highImage: character.highImage,
        statusBars: character.statusBars.map(s => ({ min: s.min, max: s.max })),
        attributes: [...character.attributes],
      };
    else {
      this.states[roomCode][username] = {
        socketId,
        name: '',
        statusBars: room.statBars.map(_ => ({ min: 20, max: 20 })),
        attributes: room.attributes.map(_ => 5),
      };
      await CharacterRepository.addCharacter({
        owner: username,
        room: roomCode,
        name: this.states[roomCode][username].name,
        statusBars: this.states[roomCode][username].statusBars.map(s => ({
          min: s.min,
          max: s.max,
        })),
        attributes: [...this.states[roomCode][username].attributes],
      });
    }

    return this.states[roomCode];
  }

  async leaveRoom(socketId: string): Promise<IGameSocketState> {
    for (const roomCode of Object.keys(this.states))
      for (const playerName of Object.keys(this.states[roomCode]))
        if (this.states[roomCode][playerName].socketId === socketId) {
          CharacterRepository.changeCharacter({
            owner: playerName,
            room: roomCode,
            name: this.states[roomCode][playerName].name,
            deadImage: this.states[roomCode][playerName].deadImage,
            lowImage: this.states[roomCode][playerName].lowImage,
            mediumImage: this.states[roomCode][playerName].mediumImage,
            highImage: this.states[roomCode][playerName].highImage,
            statusBars: this.states[roomCode][playerName].statusBars.map(s => ({
              min: s.min,
              max: s.max,
            })),
            attributes: [...this.states[roomCode][playerName].attributes],
          });
          delete this.states[roomCode][playerName];
          return this.states[roomCode];
        }
    throw new Error('Room not found.');
  }

  async characterChanged(
    token: string,
    roomCode: string,
    characterData: ICharacter
  ): Promise<IGameSocketState> {
    const username = validateToken(token);
    this.states[roomCode][username].name = characterData.name
    this.states[roomCode][username].deadImage = characterData.deadImage
    this.states[roomCode][username].lowImage = characterData.lowImage
    this.states[roomCode][username].mediumImage = characterData.mediumImage
    this.states[roomCode][username].highImage = characterData.highImage
    this.states[roomCode][username].statusBars = characterData.statusBars
    this.states[roomCode][username].attributes = characterData.attributes

    return this.states[roomCode]
  }

}

import Character from '../models/character';
import { userInRoom } from './user';

export const characterUpdate = async (
  username: string,
  roomCode: number,
  params: Map<string, any>
) => {
  const character = await Character.findOne({
    ownerUsername: username,
    roomCode: roomCode,
  });

  if (!character) throw new Error('Character doest not exists!');

  if ('name' in params) character.name = params.get('name');

  if ('state' in params) character.state = params.get('state');

  if ('image' in params) character.image = params.get('image');

  await character.save();
};

export const characterCreate = async (username: string, roomCode: number) => {
  console.log(roomCode);
  if (!(await userInRoom(username, roomCode)))
    throw Error('User not in this room!');

  const character = new Character({
    ownerUsername: username,
    roomCode: roomCode,
  });

  await character.save();
};

import mongoose from 'mongoose';
import { CharacterRepository } from './CharacterRepository';
import { RoomRepository } from './RoomRepository';

/* In memory Interface */
export interface IUser {
  username: string;
  email: string;
  password: string;
}

/* Database Schema */
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserDb = mongoose.model('User', userSchema);

/* Repository */
interface IUserRepository {
  checkIfExistsByUsername: (username: string) => Promise<boolean>;
  findByUsername: (username: string) => Promise<IUser | null>;
  findUsernameByEmail: (email: string) => Promise<string | null>;
  addUser: (user: IUser) => Promise<void>;
  changeUser: (oldUsername: string, user: IUser) => Promise<void>;
  deleteUser: (username: string) => Promise<void>;
}

export const UserRepository: IUserRepository = {
  checkIfExistsByUsername: async (username: string) => {
    return (await UserDb.findOne({ username }).exec()) !== null;
  },

  findByUsername: async (username: string) => {
    return await UserDb.findOne({ username }).exec();
  },

  findUsernameByEmail: async (email: string) => {
    const queryResult = await UserDb.findOne({ email }, 'username').exec();
    return queryResult !== null ? queryResult.username : null;
  },

  addUser: async (user: IUser) => {
    await new UserDb(user).save();
  },

  changeUser: async (oldUsername: string, user: IUser) => {
    await UserDb.updateOne({ username: oldUsername }, user).exec();
    await RoomRepository.ownerUsernameChanged(oldUsername, user.username);
    await CharacterRepository.usernameChanged(oldUsername, user.username);
  },

  deleteUser: async (username: string) => {
    await UserDb.deleteOne({ username }).exec();
    await RoomRepository.ownerUsernameDeleted(username);
    await CharacterRepository.usernameDeleted(username);
  },
};

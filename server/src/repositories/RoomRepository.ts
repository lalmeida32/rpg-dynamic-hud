import mongoose from 'mongoose';
import crypto from 'crypto';

/* In memory Interface */
export interface IRoom {
  uniqueCode: string;
  owner: string;
  opened: boolean;
  name: string;
  statBars: {
    name: string;
    color: string;
  }[];
  attributes: string[];
  dice: number[];
}

/* Database Schema */
const { Schema } = mongoose;

const roomSchema = new Schema({
  uniqueCode: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  opened: {
    type: Boolean,
    required: true,
  },
  statBars: {
    type: [
      new Schema({
        name: { type: String, required: true },
        color: { type: String, required: true },
      }),
    ],
    required: true,
  },
  attributes: {
    type: [String],
    required: true,
  },
  dice: {
    type: [Number],
    required: true,
  },
});

const RoomDb = mongoose.model('Room', roomSchema);

/* Repository */
interface IRoomRepository {
  checkIfExistsByUniqueCode: (uniqueCode: string) => Promise<boolean>;
  findAllUniqueCodes: () => Promise<string[]>;
  findByUniqueCode: (uniqueCode: string) => Promise<IRoom | null>;
  addRoom: (room: IRoom) => Promise<void>;
  ownerUsernameChanged: (oldOwner: string, newOwner: string) => Promise<void>;
  ownerUsernameDeleted: (owner: string) => Promise<void>;
  changeRoom: (room: IRoom) => Promise<void>;
}

const copyRoom = (room: IRoom): IRoom => {
  return {
    uniqueCode: room.uniqueCode,
    name: room.name,
    owner: room.owner,
    opened: room.opened,
    statBars: room.statBars.map(v => Object.assign({}, v)),
    attributes: [...room.attributes],
    dice: [...room.dice],
  };
};

export const RoomRepository: IRoomRepository = {
  checkIfExistsByUniqueCode: async (uniqueCode: string) => {
    return (await RoomDb.findOne({ uniqueCode }).exec()) !== null;
  },

  findAllUniqueCodes: async () => {
    return (await RoomDb.find({}, 'uniqueCode').exec()).map(v => v.uniqueCode);
  },

  findByUniqueCode: async uniqueCode => {
    return await RoomDb.findOne({ uniqueCode }).exec();
  },

  addRoom: async room => {
    const uniqueCode = crypto.randomBytes(6).toString('hex');
    const newRoom = copyRoom(room);
    newRoom.uniqueCode = uniqueCode;
    await new RoomDb(newRoom).save();
  },

  ownerUsernameChanged: async (oldOwner, newOwner) => {
    if (oldOwner === newOwner) return;
    await RoomDb.updateMany({ owner: oldOwner }, { owner: newOwner }).exec();
  },

  ownerUsernameDeleted: async owner => {
    await RoomDb.deleteMany({ owner }).exec();
  },

  changeRoom: async (room: IRoom) => {
    await RoomDb.updateOne({ uniqueCode: room.uniqueCode }, room).exec();
  },
};

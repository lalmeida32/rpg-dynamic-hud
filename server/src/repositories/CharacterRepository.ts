export interface ICharacter {
  owner: string;
  room: string;
  name: string;
  deadImage: Uint8Array;
  lowImage: Uint8Array;
  mediumImage: Uint8Array;
  highImage: Uint8Array;
  statusBars: { min: number; max: number }[];
  attributes: number[];
}

import mongoose from 'mongoose';

const { Schema } = mongoose;

export const characterSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deadImage: {
    type: Buffer,
    required: true,
  },
  lowImage: {
    type: Buffer,
    required: true,
  },
  mediumImage: {
    type: Buffer,
    required: true,
  },
  highImage: {
    type: Buffer,
    required: true,
  },
  statusBars: {
    type: [
      new Schema({
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      }),
    ],
    required: true,
  },
  attributes: {
    type: [Number],
    required: true,
  },
});

characterSchema.index({ owner: 1, room: 1 }, { unique: true });

const CharacterDb = mongoose.model('Character', characterSchema);

interface ICharacterRepository {
  checkIfExistsByCompositeKey: (
    room: string,
    owner: string
  ) => Promise<boolean>;
  findAllCompositeKeys: () => Promise<[string, string][]>;
  findByCompositeKey: (
    room: string,
    owner: string
  ) => Promise<ICharacter | null>;
  usernameChanged: (oldUsername: string, newUsername: string) => Promise<void>;
  usernameDeleted: (username: string) => Promise<void>;
  roomDeleted: (room: string) => Promise<void>;
}

export const CharacterRepository: ICharacterRepository = {
  checkIfExistsByCompositeKey: async (room, owner) => {
    return (
      (await CharacterDb.findOne({ $and: [{ room }, { owner }] }).exec()) !==
      null
    );
  },

  findAllCompositeKeys: async () => {
    return (await CharacterDb.find({}, 'owner room').exec()).map(v => [
      v.owner,
      v.room,
    ]);
  },

  findByCompositeKey: async (room, owner) => {
    return await CharacterDb.findOne({ $and: [{ room }, { owner }] }).exec();
  },

  usernameChanged: async (oldUsername, newUsername) => {
    if (oldUsername === newUsername) return;
    await CharacterDb.updateMany(
      { owner: oldUsername },
      { owner: newUsername }
    ).exec();
  },

  usernameDeleted: async username => {
    await CharacterDb.deleteMany({ owner: username }).exec();
  },

  roomDeleted: async room => {
    await CharacterDb.deleteMany({ room }).exec();
  },
};

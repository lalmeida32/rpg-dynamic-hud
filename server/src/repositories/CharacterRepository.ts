export interface ICharacter {
  owner: string;
  room: string;
  name?: string;
  deadImage?: Uint8Array;
  lowImage?: Uint8Array;
  mediumImage?: Uint8Array;
  highImage?: Uint8Array;
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
    required: false,
  },
  deadImage: {
    type: Buffer,
    required: false,
  },
  lowImage: {
    type: Buffer,
    required: false,
  },
  mediumImage: {
    type: Buffer,
    required: false,
  },
  highImage: {
    type: Buffer,
    required: false,
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
  addCharacter: (character: ICharacter) => Promise<void>;
  changeCharacter: (character: ICharacter) => Promise<void>;
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

  addCharacter: async character => {
    await new CharacterDb(character).save();
  },

  changeCharacter: async character => {
    await CharacterDb.updateOne(
      { $and: [{ room: character.room }, { owner: character.owner }] },
      character
    ).exec();
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

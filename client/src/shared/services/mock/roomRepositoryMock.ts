import { randomInteger } from 'shared/lib/random';

export interface IRoomMock {
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

interface IRoomDb {
  [key: string]: IRoomMock;
}

const roomDb: IRoomDb = {
  '1341': {
    name: 'Dungeons',
    owner: 'johnsmith',
    opened: false,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Mana', color: 'blue' },
    ],
    attributes: ['Strength', 'Agility', 'Vitality', 'Intelligence', 'Wisdom'],
    dice: [6, 8, 12, 20],
  },
  '1342': {
    name: 'Dungeons 2',
    owner: 'johnsmith',
    opened: false,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Mana', color: 'blue' },
    ],
    attributes: ['Strength', 'Agility', 'Vitality', 'Intelligence', 'Wisdom'],
    dice: [6, 8, 12, 20],
  },
  '1343': {
    name: 'Dungeons 3',
    owner: 'johnsmith',
    opened: false,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Mana', color: 'blue' },
    ],
    attributes: ['Strength', 'Agility', 'Vitality', 'Intelligence', 'Wisdom'],
    dice: [6, 8, 12, 20],
  },
  '3991': {
    name: 'Cyberpunk',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3992': {
    name: 'Cyberpunk 2',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3993': {
    name: 'Cyberpunk 3',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3994': {
    name: 'Cyberpunk 4',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3995': {
    name: 'Cyberpunk 5',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3996': {
    name: 'Cyberpunk 6',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3997': {
    name: 'Cyberpunk 7',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3998': {
    name: 'Cyberpunk 8',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '3999': {
    name: 'Cyberpunk 9',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '4000': {
    name: 'Cyberpunk 10',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '4001': {
    name: 'Cyberpunk 11',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '4002': {
    name: 'Cyberpunk 12',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
  '4003': {
    name: 'Cyberpunk 13',
    owner: 'jackfreeman',
    opened: true,
    statBars: [
      { name: 'Health', color: 'red' },
      { name: 'Stamina', color: 'yellow' },
    ],
    attributes: ['Strength', 'Dexterity', 'Vitality', 'Knowledge'],
    dice: [8, 12, 20, 100],
  },
};

interface IRoomRepository {
  checkIfExistsByUniqueCode: (uniqueCode: string) => boolean;
  findAllUniqueCodes: () => string[];
  findByUniqueCode: (uniqueCode: string) => IRoomMock | null;
  addRoom: (room: IRoomMock) => void;
  ownerUsernameChanged: (oldOwner: string, newOwner: string) => void;
  ownerUsernameDeleted: (owner: string) => void;
}

const copyRoom = (room: IRoomMock): IRoomMock => {
  return {
    name: room.name,
    owner: room.owner,
    opened: room.opened,
    statBars: room.statBars.map(v => Object.assign({}, v)),
    attributes: [...room.attributes],
    dice: [...room.dice],
  };
};

export const roomRepositoryMock: IRoomRepository = {
  checkIfExistsByUniqueCode: (uniqueCode: string) => {
    return uniqueCode in roomDb;
  },

  findAllUniqueCodes: () => {
    return Object.keys(roomDb);
  },
  findByUniqueCode: uniqueCode => {
    if (uniqueCode in roomDb) return copyRoom(roomDb[uniqueCode]);
    return null;
  },

  addRoom: room => {
    let uniqueCode = 0;
    do {
      uniqueCode = randomInteger(1000, 9999);
    } while (uniqueCode in roomDb);
    roomDb[uniqueCode] = copyRoom(room);
  },

  ownerUsernameChanged: (oldOwner, newOwner) => {
    if (oldOwner === newOwner) return;
    for (const uniqueCode in roomDb)
      if (roomDb[uniqueCode].owner === oldOwner)
        roomDb[uniqueCode].owner = newOwner;
  },

  ownerUsernameDeleted: owner => {
    for (const uniqueCode in roomDb)
      if (roomDb[uniqueCode].owner === owner) delete roomDb[uniqueCode];
  },
};

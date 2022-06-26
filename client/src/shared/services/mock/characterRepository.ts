export interface ICharacterMock {
  name: string;
}

interface ICharacterDb {
  [key: string]: ICharacterMock;
}

const characterDb: ICharacterDb = {
  '1341@jackfreeman': {
    name: 'Jackie',
  },
  '1341@robert': {
    name: 'Robertie',
  },
  '1342@robert': {
    name: 'Robertie 2',
  },
  '3991@robert': {
    name: 'Robertpunk',
  },
  '3992@robert': {
    name: 'Robertpunk 2',
  },
  '3993@robert': {
    name: 'Robertpunk 3',
  },
  '3994@robert': {
    name: 'Robertpunk 4',
  },
  '3995@robert': {
    name: 'Robertpunk 5',
  },
};

interface ICharacterRepository {
  checkIfExistsByCompositeKey: (
    uniqueCode: string,
    username: string
  ) => boolean;
  findAllCompositeKeys: () => string[];
  findByCompositeKey: (
    uniqueCode: string,
    username: string
  ) => ICharacterMock | null;
  usernameChanged: (oldUsername: string, newUsername: string) => void;
  usernameDeleted: (username: string) => void;
  // roomStateChanged: => void;
  roomDeleted: (uniqueCode: string) => void;
}

export const characterRepositoryMock: ICharacterRepository = {
  checkIfExistsByCompositeKey: (uniqueCode, username) => {
    return `${uniqueCode}@${username}` in characterDb;
  },

  findAllCompositeKeys: () => {
    return Object.keys(characterDb);
  },

  findByCompositeKey: (uniqueCode, username) => {
    const key = `${uniqueCode}@${username}`;
    if (key in characterDb) return Object.assign({}, characterDb[key]);
    return null;
  },

  usernameChanged: (oldUsername, newUsername) => {
    if (oldUsername === newUsername) return;
    for (const key in characterDb) {
      const separatorIndex = key.indexOf('@');
      if (key.slice(separatorIndex + 1) === oldUsername) {
        const newKey = key.slice(0, separatorIndex + 1) + newUsername;
        characterDb[newKey] = Object.assign({}, characterDb[key]);
        delete characterDb[key];
      }
    }
  },

  usernameDeleted: username => {
    for (const key in characterDb)
      if (key.slice(key.indexOf('@') + 1) === username) delete characterDb[key];
  },

  roomDeleted: uniqueCode => {
    for (const key in characterDb)
      if (key.slice(0, key.indexOf('@')) === uniqueCode)
        delete characterDb[key];
  },
};

export interface IUserMock {
  email: string;
  password: string;
}

interface IUserDb {
  [key: string]: IUserMock;
}

const userDb: IUserDb = {
  johnsmith: {
    email: 'johnsmith@email.net',
    password: '12345678',
  },
  jackfreeman: {
    email: 'jackfreeman@email.com',
    password: '12345678',
  },
  robert: {
    email: 'robert@email.com',
    password: '12345678',
  },
};

interface IUserRepository {
  checkIfExistsByUsername: (username: string) => boolean;
  findByUsername: (username: string) => IUserMock | null;
  findUsernameByEmail: (email: string) => string | null;
  addUser: (username: string, user: IUserMock) => void;
  changeUser: (
    oldUsername: string,
    newUsername: string,
    user: IUserMock
  ) => void;
  deleteUser: (username: string) => void;
}

export const userRepositoryMock: IUserRepository = {
  checkIfExistsByUsername: (username: string) => {
    return username in userDb;
  },

  findByUsername: (username: string) => {
    if (username in userDb) return Object.assign({}, userDb[username]);
    return null;
  },

  findUsernameByEmail: (email: string) => {
    for (const username in userDb)
      if (userDb[username].email === email) return username;
    return null;
  },

  addUser: (username: string, user: IUserMock) => {
    userDb[username] = Object.assign({}, user);
  },

  changeUser: (oldUsername: string, newUsername: string, user: IUserMock) => {
    if (!(oldUsername in userDb)) return;
    if (newUsername !== oldUsername) {
      userDb[newUsername] = Object.assign({}, userDb[oldUsername]);
      delete userDb[oldUsername];
    }
    userDb[newUsername].email = user.email;
    userDb[newUsername].password = user.password;
  },

  deleteUser: (username: string) => {
    if (!(username in userDb)) return;
    delete userDb[username];
  },
};

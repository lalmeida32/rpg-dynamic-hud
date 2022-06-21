interface IUser {
  email: string;
  password: string;
}

interface IUserDb {
  [key: string]: IUser;
}

export const userDb: IUserDb = {
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

export const getUsernameByEmail = (email: string) => {
  for (const username in userDb)
    if (userDb[username].email === email) return username;
  return null;
};

export const checkUserPassword = (username: string, password: string) => {
  if (userDb[username].password === password) return true;
  return false;
};

export const validateEmail = (email: string) => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) return true;
  return false;
};

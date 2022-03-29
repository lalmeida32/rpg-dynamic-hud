import { IServerSettings } from './IServerSettings';

export const defaultServerSettings: IServerSettings = {
  port: 3000,
  commands: false,
  node: {
    env: 'development',
  },
  database: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
  },
};

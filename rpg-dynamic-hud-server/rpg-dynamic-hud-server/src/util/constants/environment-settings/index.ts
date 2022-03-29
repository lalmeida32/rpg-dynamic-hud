import { IEnvironmentSettings } from './interfaces';

export const envSettings: IEnvironmentSettings = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  readline: process.env.READLINE || 'false',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
  },
};

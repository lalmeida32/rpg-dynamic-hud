import { IServerSettings } from './IServerSettings';

export const defaultServerSettings: Readonly<IServerSettings> = {
  port: 3000,
  debug: 'app:*',
  dotenv: 'cwd',
  morgan: 'dev',
  node_env: 'development',
  database_host: 'localhost',
  database_port: 3306,
  database_username: 'root',
  database_password: '',
};
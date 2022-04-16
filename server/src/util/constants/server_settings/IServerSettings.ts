export interface IServerSettings {
  port: number;
  dotenv: 'none' | 'cwd' | 'bin';
  debug: string;
  morgan: 'none' | 'tiny' | 'dev';
  // node
  node_env: 'development' | 'staging' | 'production';
  // database
  database_host: string;
  database_port: number;
  database_username: string;
  database_password: string;
}

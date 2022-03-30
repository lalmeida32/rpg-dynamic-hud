export interface IServerSettings {
  port: number;
  commands: boolean;
  dotenv: 'none' | 'cwd' | 'bin';
  // node
  node_env: 'development' | 'staging' | 'production';
  // database
  database_host: string;
  database_port: number;
  database_username: string;
  database_password: string;
}

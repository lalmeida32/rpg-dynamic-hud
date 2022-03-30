export interface IServerSettings {
  readonly port: number;
  readonly commands: boolean;
  readonly dotenv: 'none' | 'cwd' | 'bin';
  // node
  readonly node_env: 'development' | 'staging' | 'production';
  // database
  readonly database_host: string;
  readonly database_port: number;
  readonly database_username: string;
  readonly database_password: string;
}

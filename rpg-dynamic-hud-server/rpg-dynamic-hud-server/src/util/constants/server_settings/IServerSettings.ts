interface IServerSettingsNode {
  readonly env: 'development' | 'staging' | 'production';
}

interface IServerSettingsDatabase {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
}

export interface IServerSettings {
  [index: string]: unknown;
  readonly port: number;
  readonly commands: boolean;
  readonly node: IServerSettingsNode;
  readonly database: IServerSettingsDatabase;
}

interface IServerSettingsDatabase {
  readonly host: string;
  readonly port: string;
  readonly username: string;
  readonly password: string;
}

export interface IServerSettings {
  readonly env: string;
  readonly port: string;
  readonly readline: string;
  readonly database: IServerSettingsDatabase;
}

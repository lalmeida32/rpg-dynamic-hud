interface IEnvironmentSettingsDatabase {
  readonly host: string;
  readonly port: string;
  readonly username: string;
  readonly password: string;
}

export interface IEnvironmentSettings {
  readonly env: string;
  readonly port: string;
  readonly database: IEnvironmentSettingsDatabase;
}

interface IEnvironmentSettingsDatabase {
  host: string;
  port: string;
  username: string;
  password: string;
}

export interface IEnvironmentSettings {
  env: string;
  port: string;
  database: IEnvironmentSettingsDatabase;
}

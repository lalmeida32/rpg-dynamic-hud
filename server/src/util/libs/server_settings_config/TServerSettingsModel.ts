import { IServerSettings } from 'util/constants/server_settings';

export type TServerSettingsModel = {
  [key in keyof IServerSettings]?: string;
};

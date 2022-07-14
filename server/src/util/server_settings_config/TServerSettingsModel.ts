import { IServerSettings } from './IServerSettings';

export type TServerSettingsModel = {
  [key in keyof IServerSettings]?: string;
};

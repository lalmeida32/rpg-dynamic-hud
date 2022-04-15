import { IServerSettings } from 'util/constants/server_settings';
import { TServerSettingsModel } from '../server_settings_model';

export type TSettingsValidation = (
  serverSettingsModel: TServerSettingsModel
) => Readonly<IServerSettings>;

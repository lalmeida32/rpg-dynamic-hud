import dotenv from 'dotenv';

import { defaultServerSettings } from 'util/constants/server_settings';

import { TServerSettingsModel } from '../server_settings_model';
import { ISolvedArgs, argsSolver } from 'util/libs/args_solver';
import path from 'path';
import { settingsValidation } from '../settings_validation';

const serverSettingsModel: TServerSettingsModel = {};
for (const key in defaultServerSettings)
  serverSettingsModel[key as keyof TServerSettingsModel] = undefined;

/* Load launch options */

const launchOptions: ISolvedArgs = argsSolver(process.argv.splice(2));
for (const key in launchOptions.optional)
  if (key in serverSettingsModel)
    serverSettingsModel[key as keyof TServerSettingsModel] =
      launchOptions.optional[key];
  else throw Error(`${key} launch option is not valid.`);

/* Run dotenv */
if (serverSettingsModel.dotenv === undefined)
  serverSettingsModel.dotenv = defaultServerSettings.dotenv;

if (serverSettingsModel.dotenv === 'cwd') {
  const { error } = dotenv.config();
  console.log(
    `Loading dotenv in ${process.cwd()}: ${error ? 'error' : 'success'}`
  );
  if (error) throw Error(`Something happened when loading dotenv.`);
} else if (serverSettingsModel.dotenv === 'bin') {
  const dotenvPath = path.resolve(process.argv[0], '..', '.env');
  const { error } = dotenv.config({ path: dotenvPath });
  console.log(
    `Loading dotenv in ${dotenvPath}: ${error ? 'error' : 'success'}`
  );
  if (error) throw Error(`Something happened when loading dotenv.`);
} else if (serverSettingsModel.dotenv !== 'none')
  throw Error(`${serverSettingsModel.dotenv} is not a valid value for dotenv.`);

/* Load environment variables or default */
for (const key in serverSettingsModel) {
  if (serverSettingsModel[key as keyof TServerSettingsModel] === undefined) {
    serverSettingsModel[key as keyof TServerSettingsModel] =
      process.env[key.toUpperCase()] ||
      String(defaultServerSettings[key as keyof TServerSettingsModel]);
  }
}

/* Save back to environment variables to be consistent */
for (const key in serverSettingsModel) {
  process.env[key.toUpperCase()] =
    serverSettingsModel[key as keyof TServerSettingsModel];
}

/* Validation and exporting */
const serverSettings = settingsValidation(serverSettingsModel);

export { serverSettings };

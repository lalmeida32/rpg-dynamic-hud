import dotenv from 'dotenv';

import path from 'path';

import { defaultServerSettings } from './defaultServerSettings';
import { ISolvedArgs, argsSolver } from 'util/args_solver';

import { TServerSettingsModel } from './TServerSettingsModel';
import { settingsValidation } from './settingsValidation';

type TKey = keyof TServerSettingsModel;

const serverSettingsModel: TServerSettingsModel = {};
for (const key in defaultServerSettings)
  serverSettingsModel[key as TKey] = undefined;

/* Load launch options */

const launchOptions: ISolvedArgs = argsSolver(process.argv.splice(2));
for (const key in launchOptions.optional)
  if (key in serverSettingsModel)
    serverSettingsModel[key as TKey] = launchOptions.optional[key];
  else throw Error(`${key} launch option is not valid.`);

/* Run dotenv */
if (serverSettingsModel.dotenv === undefined)
  serverSettingsModel.dotenv =
    process.env.DOTENV || defaultServerSettings.dotenv;

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
  if (serverSettingsModel[key as TKey] === undefined) {
    serverSettingsModel[key as TKey] =
      process.env[key.toUpperCase()] ||
      String(defaultServerSettings[key as TKey]);
  }
}

/* Save back to environment variables to be consistent */
for (const key in serverSettingsModel) {
  process.env[key.toUpperCase()] = serverSettingsModel[key as TKey];
}

/* Validation and exporting */
const serverSettings = settingsValidation(serverSettingsModel);

export { serverSettings };

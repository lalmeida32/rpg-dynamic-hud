import { IServerSettings } from './IServerSettings';
import { defaultServerSettings } from './defaultServerSettings';
import { TServerSettingsModel } from './TServerSettingsModel';

/* Util types */

type TSettingsValidation = (
  serverSettingsModel: TServerSettingsModel
) => Readonly<IServerSettings>;

type TValidate<T> = (tStr?: string) => T;

/* Generic validation */

const genericError = (name: string, tStr?: string) =>
  Error(`${tStr} is not a valid value for ${name}.`);

const createGenericValidateString: (
  name: string
) => TValidate<string> = name => {
  return tStr => {
    if (tStr !== undefined) return tStr;
    throw genericError(name, tStr);
  };
};
const createGenericValidateNumber: (
  name: string
) => TValidate<number> = name => {
  return tStr => {
    if (tStr !== undefined && !isNaN(+tStr)) return +tStr;
    throw genericError(name, tStr);
  };
};
/*
const createGenericValidateBoolean: (
  name: string
) => TValidate<boolean> = name => {
  return tStr => {
    if (tStr === 'true') return true;
    if (tStr === 'false') return false;
    throw genericError(name, tStr);
  };
};
*/

/* Specific validation */

const validatePort = createGenericValidateNumber('port');

type TDotenv = typeof defaultServerSettings.dotenv;
const validateDotenv: TValidate<TDotenv> = dotenv => {
  if (dotenv === 'none' || dotenv === 'cwd' || dotenv === 'bin') return dotenv;
  throw genericError('dotenv', dotenv);
};

type TMorgan = typeof defaultServerSettings.morgan;
const validateMorgan: TValidate<TMorgan> = morgan => {
  if (morgan === 'none' || morgan === 'tiny' || morgan === 'dev') return morgan;
  throw genericError('morgan', morgan);
};

const validateDebug = createGenericValidateString('debug');

type TNodeEnv = typeof defaultServerSettings.node_env;
const validateNodeEnv: TValidate<TNodeEnv> = nodeEnv => {
  if (
    nodeEnv === 'development' ||
    nodeEnv === 'staging' ||
    nodeEnv === 'production'
  )
    return nodeEnv;
  throw genericError('node_env', nodeEnv);
};

const validateDatabaseHost = createGenericValidateString('database_host');
const validateDatabasePort = createGenericValidateNumber('database_port');
const validateDatabaseUsername =
  createGenericValidateString('database_username');
const validateDatabasePassword =
  createGenericValidateString('database_password');

/* Exporting validations */

export const settingsValidation: TSettingsValidation = serverSettingsModel => {
  return {
    port: validatePort(serverSettingsModel.port),
    morgan: validateMorgan(serverSettingsModel.morgan),
    dotenv: validateDotenv(serverSettingsModel.dotenv),
    debug: validateDebug(serverSettingsModel.debug),
    node_env: validateNodeEnv(serverSettingsModel.node_env),
    database_host: validateDatabaseHost(serverSettingsModel.database_host),
    database_port: validateDatabasePort(serverSettingsModel.database_port),
    database_username: validateDatabaseUsername(
      serverSettingsModel.database_username
    ),
    database_password: validateDatabasePassword(
      serverSettingsModel.database_password
    ),
  };
};

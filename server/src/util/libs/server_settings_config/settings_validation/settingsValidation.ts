import { defaultServerSettings } from 'util/constants/server_settings';
import { TSettingsValidation } from './TSettingsValidation';

type TValidate<T> = (tStr?: string) => T;

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

const createGenericValidateBoolean: (
  name: string
) => TValidate<boolean> = name => {
  return tStr => {
    if (tStr === 'true') return true;
    if (tStr === 'false') return false;
    throw genericError(name, tStr);
  };
};

const validatePort = createGenericValidateNumber('port');
const validateCommands = createGenericValidateBoolean('commands');

type TDotenv = typeof defaultServerSettings.dotenv;
const validateDotenv: TValidate<TDotenv> = dotenv => {
  if (dotenv === 'none' || dotenv === 'cwd' || dotenv === 'bin') return dotenv;
  throw genericError('dotenv', dotenv);
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

export const settingsValidation: TSettingsValidation = serverSettingsModel => {
  return {
    port: validatePort(serverSettingsModel.port),
    commands: validateCommands(serverSettingsModel.commands),
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

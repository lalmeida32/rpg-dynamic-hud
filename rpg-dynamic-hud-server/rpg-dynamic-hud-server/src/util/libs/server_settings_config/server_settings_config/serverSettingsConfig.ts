import {
  defaultServerSettings,
  IServerSettings,
} from 'util/constants/server_settings';

/* Load argv */

/* Load environment variables */

/* Load default  */

/* */
export const serverSettings: IServerSettings = { ...defaultServerSettings };

const f = (obj: object) => console.log(obj);

f(serverSettings);

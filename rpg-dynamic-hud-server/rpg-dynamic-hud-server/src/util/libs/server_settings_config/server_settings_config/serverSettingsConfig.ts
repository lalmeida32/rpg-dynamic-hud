import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  defaultServerSettings,
  IServerSettings,
} from 'util/constants/server_settings';
import { deepIteration } from 'util/libs/deep_iteration';

import { ISettingModel } from '../setting_model';

/* Load setting models  */
const settingModels: ISettingModel[] = [];

deepIteration(defaultServerSettings, (element, keyStack) => {
  settingModels.push({
    keys: [...keyStack],
  });
});

/* Load argv */

const argv = yargs(hideBin(process.argv)).parseSync();
for (const setting of settingModels) {
  const settingKeyStr = setting.keys.join('-');

  if (!(settingKeyStr in argv)) continue;
  setting.value = argv[settingKeyStr];
}

/* Load environment variables */

/* Load default  */

/*  */
export const serverSettings: IServerSettings = { ...defaultServerSettings };

console.log(settingModels);

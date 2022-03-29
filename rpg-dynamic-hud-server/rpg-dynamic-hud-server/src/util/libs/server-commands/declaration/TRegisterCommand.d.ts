import { TCommandCallback } from './TCommandCallback';

export type TRegisterCommand = (
  command: string,
  callback: TCommandCallback
) => Promise<void>;

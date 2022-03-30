import { TCommandCallback } from '../command_callback';

export interface IServerCommands {
  subscribe: (command: string, callback: TCommandCallback) => void;
  run: () => Promise<void>;
  stop: () => void;
  get running(): boolean;
}

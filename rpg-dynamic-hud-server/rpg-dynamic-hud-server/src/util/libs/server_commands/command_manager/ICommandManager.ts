import { TCommandCallback } from '../command_callback';

export interface ICommandManager {
  subscribe: (command: string, callback: TCommandCallback) => void;
  run: () => Promise<void>;
  stop: () => void;
  get running(): boolean;
}

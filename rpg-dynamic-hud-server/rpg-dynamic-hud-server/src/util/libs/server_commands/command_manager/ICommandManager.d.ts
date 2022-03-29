import { TCommandCallback } from '../command-callback';

export interface ICommandManager {
  subscribe: (command: string, callback: TCommandCallback) => void;
  run: () => Promise<void>;
  stop: () => void;
  get running(): boolean;
}

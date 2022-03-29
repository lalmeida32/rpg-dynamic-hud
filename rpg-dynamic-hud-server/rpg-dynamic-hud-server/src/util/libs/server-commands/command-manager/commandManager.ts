import { TCommandCallback } from '../command-callback';
import { ICommandManager } from './ICommandManager';
import readline from 'readline';

const commandsHash: Record<string, TCommandCallback> = {};
let stdio: readline.Interface | null = null;
const isRunning = () => stdio !== null;

export const commandManager: ICommandManager = {
  subscribe: (command, callback) => {
    commandsHash[command] = callback;
  },
  run: async () => {
    if (isRunning()) return;
    stdio = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    stdio.on('close', () => {
      console.log('really stopped');
      stdio = null;
    });
  },
  stop: () => {
    stdio?.close();
  },
  get running() {
    return isRunning();
  },
};

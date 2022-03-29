import readline from 'readline';

export const stdInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

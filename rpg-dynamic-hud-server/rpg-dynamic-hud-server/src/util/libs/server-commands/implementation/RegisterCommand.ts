import readline from 'readline';

const stdInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// export const registerCommand = () => {};

stdInput.question('', command => {
  if (command === 'shutdown') console.log('shutdown out');
  else console.log(command);
  stdInput.close();
});

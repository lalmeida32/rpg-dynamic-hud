import path from 'path';
import dotenv from 'dotenv';

const { error } = dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

// console.log(require.main);

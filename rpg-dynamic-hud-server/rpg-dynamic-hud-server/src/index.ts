import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';

import { envSettings } from './util/constants/environment-settings';

debug('app:setup')(`Starting ${envSettings.env} environment debug`);

const app = express();
const port = +envSettings.port;

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
);

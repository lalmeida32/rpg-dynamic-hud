import { serverSettings } from 'util/libs/server_settings_config';

import path from 'path';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';

debug('app:setup')(`Starting ${serverSettings.node_env} environment debug`);

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('Express + TypeScript Server');
});

const port = serverSettings.port;
app.listen(port, () =>
  debug('app:setup')(`Server is running at http://localhost:${port}`)
);

import { serverSettings } from 'util/libs/server_settings_config';

import path from 'path';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';

debug('app:setup')(`Starting ${serverSettings.node_env} environment debug`);

const app = express();

// MIDDLEWARES

app.use(helmet());
if (serverSettings.morgan !== 'none') {
  debug('app:setup')(`Morgan enabled with ${serverSettings.morgan}`);
  app.use(morgan(serverSettings.morgan));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('Express + TypeScript Server');
});

const port = serverSettings.port;
app.listen(port, () =>
  debug('app:setup')(`Server is running at http://localhost:${port}`)
);

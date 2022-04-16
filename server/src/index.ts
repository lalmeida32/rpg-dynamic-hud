import { serverSettings } from 'util/libs/server_settings_config';

import path from 'path';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';

const app = express();

debug('app:setup')(`Starting ${serverSettings.node_env} environment debug`);

// MIDDLEWARES

app.use(helmet());
if (serverSettings.morgan !== 'none') {
  debug('app:setup')(`Morgan enabled with ${serverSettings.morgan}`);
  app.use(morgan(serverSettings.morgan));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

app.get('/api', (req, res) => {
  res.send('Express + TypeScript Server');
});

// LISTEN

const port = serverSettings.port;
app.listen(port, () =>
  debug('app:setup')(`Server is running at http://localhost:${port}`)
);

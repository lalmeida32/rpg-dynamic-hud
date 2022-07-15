import { serverSettings } from 'util/server_settings_config';

import path from 'path';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';
import gracefulShutdown from 'http-graceful-shutdown';

import mongoose from 'mongoose';

import UserRouter from './routes/UserRoutes';
import AuthRouter from './routes/AuthRoutes';
import RoomRouter from './routes/RoomRoutes';
import EmailRouter from './routes/EmailRoutes';

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

app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/rooms', RoomRouter);
app.use('/api/emails', EmailRouter);

// LISTEN

const port = serverSettings.port;
const server = app.listen(port, async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/rpg');
  debug('app:setup')(`Server is running at http://localhost:${port}`);
});

// EVENTS

gracefulShutdown(server);

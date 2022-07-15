import { serverSettings } from 'util/server_settings_config';

import path from 'path';
import http from 'http';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';
import cors from 'cors';
import gracefulShutdown from 'http-graceful-shutdown';

import mongoose from 'mongoose';

import UserRouter from './routes/UserRoutes';
import AuthRouter from './routes/AuthRoutes';
import RoomRouter from './routes/RoomRoutes';
import EmailRouter from './routes/EmailRoutes';
import RoomPaginationRouter from './routes/RoomPaginationRoutes';
import { setGameSocketEvents } from 'routes/GameSocketRoutes';

const app = express();
const server = http.createServer(app);

debug('app:setup')(`Starting ${serverSettings.node_env} environment debug`);

// MIDDLEWARES

app.use(helmet());
app.use(cors());
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
app.use('/api/roompages', RoomPaginationRouter);

// EVENTS

setGameSocketEvents(server);
gracefulShutdown(server);

// LISTEN

const port = serverSettings.port;
server.listen(port, async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/rpg');
  debug('app:setup')(`Server is running at http://localhost:${port}`);
});

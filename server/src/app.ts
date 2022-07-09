import express from 'express';
import date from 'date-and-time';

import mongoose from 'mongoose';

import userRouter from './controllers/user.js';

const app = express();
const port = 4000;

const logger = (req: express.Request, res: express.Response, next: Function) => {
    const now = new Date();
    const d = date.format(now, 'YYYY-MM-DD HH:mm:ss');

    console.log('['+d+']', req.hostname, '-', req.path);
    next();
}

app.use(logger);
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hey')
});

app.use('/user', userRouter);


app.listen(port, async () => {
    await mongoose.connect('mongodb://localhost:27017/rpg');
    console.log('listening');
});

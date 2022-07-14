import express from 'express';

import { characterUpdate, characterCreate } from '../service/character';

const router = express.Router();

router.put('/update', async (req: express.Request, res: express.Response) => {
  const username = (req.query as any).username;
  const roomCode = parseInt((req.query as any).roomcode);

  try {
    await characterUpdate(username, roomCode, req.body);
    res.send({ status: 'Character Updated!' });
  } catch (e) {
    res.status(400).send({ status: 'Invalid character!' });
  }
});

router.post('/create', async (req: express.Request, res: express.Response) => {
  console.log(req.query);
  const username = (req.query as any).username;
  const roomCode = parseInt((req.query as any).roomcode);

  try {
    await characterCreate(username, roomCode);
    res.send({ status: 'Character Created!' });
  } catch (e) {
    console.log(e);
    res.status(400).send({ status: 'Invalid body!' });
  }
});

export default router;

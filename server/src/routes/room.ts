import express from 'express';

import { roomCreate, roomFind } from '../service/room';
import { userJoinRoom, userLeaveRoom } from '../service/user';

const router = express.Router();

router.get('/:code', async (req: express.Request, res: express.Response) => {
  const room = await roomFind(parseInt(req.params.code));

  if (!room) {
    res.status(404).send({ status: 'Room not found' });
    return;
  }

  res.send({
    code: room.code,
    owner: room.owner,
    opened: room.opened,
    statusBars: room.statusBars,
    dices: room.dices,
    characters: room.characters,
    attributes: room.attributes,
  });
});

router.put(
  '/:code/join',
  async (req: express.Request, res: express.Response) => {
    try {
      await userJoinRoom(req.body.username, parseInt(req.params.code));
      res.send('Joined!');
    } catch (e) {
      res.status(400).send('Could not join this room.');
    }
  }
);

router.put(
  '/:code/leave',
  async (req: express.Request, res: express.Response) => {
    try {
      await userLeaveRoom(req.body.username, parseInt(req.params.code));
      res.send('Left!');
    } catch (e) {
      res.status(400).send('Could not left this room.');
    }
  }
);

router.post('/create', async (req: express.Request, res: express.Response) => {
  console.log('req', req.body);
  try {
    const roomId = await roomCreate(
      req.body.username,
      req.body.name,
      req.body.bars,
      req.body.attrs,
      req.body.dices
    );
    res.send({ status: 'Room Created', roomId: roomId });
  } catch (e) {
    res.status(400).send({ status: 'Invalid Paramters!' });
  }
});

export default router;

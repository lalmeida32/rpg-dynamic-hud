import express from 'express';
import { RoomService } from 'services/RoomService';
import { getToken } from 'util/auth';

const router = express.Router();

const roomService = RoomService.getInstance();

router.get('/:code', async (req: express.Request, res: express.Response) => {
  try {
    const response = await roomService.getRoom(getToken(req), req.params.code);
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

router.put('/:code', async (req: express.Request, res: express.Response) => {
  try {
    const response = await roomService.updateRoom(
      getToken(req),
      req.params.code,
      req.body.roomInfo
    );
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

router.patch(
  '/:code/open',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await roomService.openRoom(
        getToken(req),
        req.params.code
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

router.patch(
  '/:code/close',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await roomService.closeRoom(
        getToken(req),
        req.params.code
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const response = await roomService.createRoom(
      getToken(req),
      req.body.roomInfo
    );
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

export default router;

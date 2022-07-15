import express from 'express';
import { RoomPaginationService } from 'services/RoomPaginationService';
import { getToken } from 'util/auth';

const router = express.Router();

const roomPaginationService = RoomPaginationService.getInstance();

router.get('/:page', async (req: express.Request, res: express.Response) => {
  try {
    const response = await roomPaginationService.roomCardPagination(
      getToken(req),
      Number(req.params.page)
    );
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

router.get(
  '/:page/filter',
  async (req: express.Request, res: express.Response) => {
    const query = req.header('x-query');
    try {
      const response = await roomPaginationService.roomCardPaginationWithSearch(
        getToken(req),
        query ? query : '',
        Number(req.params.page)
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

export default router;

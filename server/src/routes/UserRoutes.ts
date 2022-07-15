import express from 'express';
import { UserService } from 'services/UserService';
import { getToken } from 'util/auth';

const router = express.Router();

const userService = UserService.getInstance();

router.get(
  '/:username',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await userService.getUser(getToken(req));
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

router.patch(
  '/:username/info',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await userService.updateUser(
        getToken(req),
        req.body.userInfo
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

router.patch(
  '/:username/password',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await userService.updatePassword(
        getToken(req),
        req.body.oldPassword,
        req.body.newPassword
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const response = await userService.registerUser(req.body.userInfo);
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

router.delete(
  '/:username',
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await userService.deleteAccount(
        getToken(req),
        req.body.password
      );
      res.send(response);
    } catch (e) {
      if (e instanceof Error) res.status(404).send({ message: e.message });
    }
  }
);

export default router;

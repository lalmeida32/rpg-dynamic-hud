import express from 'express';

import { userCreate, userFind, userLogin } from 'services/user';

const router = express.Router();

router.get(
  '/:username',
  async (req: express.Request, res: express.Response) => {
    const user = await userFind(req.params.username);
    if (!user) {
      res.status(404).send({ status: 'User not found' });
      return;
    }
    res.send({
      username: user.username,
      email: user.email,
      rooms: user.roomsCodes,
    });
  }
);

router.post('/create', async (req: express.Request, res: express.Response) => {
  console.log('req', req.body);
  await userCreate(req.body.username, req.body.email, req.body.password);

  res.send({ status: 'User Created' });
});

router.post('/login', async (req: express.Request, res: express.Response) => {
  const result = await userLogin(req.body.username, req.body.password);
  if (result) res.status(200).send({ status: 'Authorized' });
  else res.status(401).send({ status: 'Login Failed' });
});

export default router;

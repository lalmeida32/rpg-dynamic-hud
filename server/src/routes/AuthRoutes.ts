import express from 'express';
import { AuthService } from 'services/AuthService';

const router = express.Router();

const authService = AuthService.getInstance();

router.post('/login', async (req: express.Request, res: express.Response) => {
  try {
    const response = await authService.logIn(
      req.body.userId,
      req.body.password
    );
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

export default router;

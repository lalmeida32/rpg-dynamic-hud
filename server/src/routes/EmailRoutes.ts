import express from 'express';
import { EmailService } from 'services/EmailService';

const router = express.Router();

const emailService = EmailService.getInstance();

router.post('/reset', async (req: express.Request, res: express.Response) => {
  try {
    const email = req.header('x-email');
    const response = await emailService.sendResetPasswordEmail(
      email ? email : ''
    );
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(404).send({ message: e.message });
  }
});

export default router;

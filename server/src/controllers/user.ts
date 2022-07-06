import express from 'express'

const router = express.Router();



router.get('/u', (req: express.Request, res: express.Response) => {
    res.send({hello: 'oi'});
})

export default router;

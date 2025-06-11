import { type Request, type Response, Router } from 'express';

const helloRouter: Router = Router();

helloRouter.get('/hello', (_req: Request, res: Response) => {
    res.json({ message: 'Express backend response test 123' });
});

export { helloRouter };
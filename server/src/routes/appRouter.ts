import { type Request, type Response, Router } from 'express';
import { apiRouter } from './api/apiRouter';
import path from 'path';

const appRouter: Router = Router(),
frontendPath = path.join(process.cwd(), '../frontend/dist');

appRouter.use('/api', apiRouter);

appRouter.get('/{*any}', (_req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

export { appRouter };
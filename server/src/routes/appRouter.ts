import { type Request, type Response, Router } from 'express';
import { apiRouter } from './api/apiRouter';
import { authRouter } from './auth/authRouter';
import path from 'path';
import authMiddleware from '@app/middleware/authMiddleware';

const appRouter: Router = Router(),
frontendPath = path.join(process.cwd(), '../frontend/dist');

appRouter.use('/api', authMiddleware, apiRouter);
appRouter.use('/auth', authRouter);

appRouter.get('/{*any}', (_req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

export { appRouter };
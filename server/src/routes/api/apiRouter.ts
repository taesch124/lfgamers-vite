import { Router } from 'express';
import { helloRouter } from '@routes/api/helloRouter';
import { igdbRouter } from '@routes/api/igdbRouter';

const apiRouter: Router = Router();
apiRouter.use(helloRouter);
apiRouter.use('/igdb', igdbRouter);

export { apiRouter };
import { Router } from 'express';
import { helloRouter } from './helloRouter';

const apiRouter: Router = Router();
apiRouter.use(helloRouter);

export { apiRouter };
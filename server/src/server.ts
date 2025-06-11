
import express, { type Express } from 'express';
import config from '@config/config';
import { DEFAULT_PORT } from '@utils/constants';
import Logger from '@utils/logger';
import UserModel from '@database/models/userModel';
import cors from 'cors';
import path from 'path';
import { appRouter } from '@routes/appRouter';

const PORT = config.server.port ?? DEFAULT_PORT, 
app: Express = express(),
frontendPath = path.join(process.cwd(), '../frontend/dist'),
logger = Logger.createLogger('app');

app.use(cors());

logger.info('Application config loaded', { config });
app.use(express.static(frontendPath));
app.use(appRouter);

app.listen(PORT, async () => {
    logger.info(`Server runing on http://localhost:${PORT}`);
    const user = await UserModel.getUser({ username: 'user1' });
    logger.info('User:', user);
});
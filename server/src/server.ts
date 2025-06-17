
import express, { type Express } from 'express';
import session from 'express-session';
import config from '@config/config';
import passport from 'passport';
import { DEFAULT_PORT } from '@utils/constants';
import Logger from '@utils/logger';
import cors from 'cors';
import path from 'path';
import { appRouter } from '@routes/appRouter';

import '@utils/passport';

const PORT = config.server.port ?? DEFAULT_PORT, 
app: Express = express(),
frontendPath = path.join(process.cwd(), '../frontend/dist'),
logger = Logger.createLogger('app');

app.use(cors({
    credentials: true,
    origin: config.server.allowedOrigins,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    // TEMP: cookie: { secure: true },
    resave: true,
    saveUninitialized: true,
    secret: 'lfgamers',
}));
app.use(passport.initialize());
app.use(passport.session());

logger.info('Application config loaded', { config });
app.use(express.static(frontendPath));
app.use(appRouter);

app.listen(PORT, () => {
    logger.info(`Server runing on http://localhost:${PORT}`);
});
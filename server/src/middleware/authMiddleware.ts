import { NextFunction, type Request, type Response } from 'express';
import Logger from '@app/utils/logger';

const logger = Logger.createLogger('authMiddleware');

export default (req: Request, _res: Response, next: NextFunction): void => {
    logger.info('Session', {session: req.session});
    if ((req.session as unknown as any)?.passport?.user) {
        return next();
    }

    return next(new Error('Invalid session'));
};